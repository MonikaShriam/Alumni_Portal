import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';
import './ReportsAnalytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Admin_ReportsAnalytics = () => {
  const [placementRate, setPlacementRate] = useState(0);
  const [avgPackage, setAvgPackage] = useState(0);
  const [placementTrends, setPlacementTrends] = useState([]);
  const [alumniStatus, setAlumniStatus] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reportType, setReportType] = useState('Placement Report');
  const [dateRange, setDateRange] = useState('Last 6 Months');
  const [format, setFormat] = useState('PDF');

  const API_BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [rateRes, pkgRes, trendRes, statusRes, deptRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/placement-rate`),
          axios.get(`${API_BASE_URL}/api/avg-package`),
          axios.get(`${API_BASE_URL}/api/placement-trends`),
          axios.get(`${API_BASE_URL}/api/alumni-status`),
          axios.get(`${API_BASE_URL}/api/department-distribution`)
        ]);

        setPlacementRate(parseFloat(rateRes.data.placement_rate).toFixed(2));
        setAvgPackage(parseFloat(pkgRes.data.avg_package).toFixed(2));
        setPlacementTrends(trendRes.data);
        setAlumniStatus(statusRes.data);
        setDepartmentData(deptRes.data);
      } catch (err) {
        setError('Error fetching analytics data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateReport = async () => {
    try {
      const payload = {
        report_type: reportType,
        date_range: dateRange,
        format: format.toLowerCase()
      };

      const response = await axios.post(`${API_BASE_URL}/api/generate-report`, payload, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${new Date().toISOString().replace(/[:.]/g, '-')}.${format.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please check the console for details.");
    }
  };

  const placementData = {
    labels: placementTrends.map(item => item.month),
    datasets: [
      {
        label: 'Students Placed',
        data: placementTrends.map(item => item.placed_count),
        fill: true,
        borderColor: '#00AEFF',
        backgroundColor: 'rgba(0,174,255,0.1)',
        tension: 0.3
      }
    ]
  };
const departmentChartData = {
  labels: departmentData.map(d => d.department),
  datasets: [
    {
      label: 'Students Count',
      data: departmentData.map(d => d.count),
      backgroundColor: ['#00FFFF', '#00AEFF', '#00DE94', '#00FF52']
    }
  ]
};

const alumniData = {
  labels: alumniStatus.map(s => s.employment_status),
  datasets: [
    {
      label: 'Employment Status Count',
      data: alumniStatus.map(s => s.count),
      backgroundColor: ['#00FFFF', '#00AEFF', '#00DE94', '#00FF52']
    }
  ]
};


  const stats = [
    { title: 'Placement Rate', value: `${placementRate}%`, change: '+2%' },
    { title: 'Average Package', value: `₹${avgPackage}`, change: '+8%' },
    { title: 'Departments', value: departmentData.length, change: '+1%' },
    { title: 'Employment Types', value: alumniStatus.length, change: '+3%' }
  ];

  if (loading) return <div className="dashboard-title">Loading analytics data...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="dashboard-wrapper">
    <div className="page-content full-account-wrapper d-flex flex-wrap p-4">
        <div className="dashboard-container">
      <h2 className="dashboard-title">Reports & Analytics</h2>

      <Row className="mb-4">
        {stats.map((stat, idx) => (
          <Col key={idx} md={3}>
            <Card className="soft-card text-center">
              <Card.Body>
                <h6 className="text-muted">{stat.title}</h6>
                <h3>{stat.value}</h3>
                <small>{stat.change}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="soft-card">
            <Card.Body>
              <h5>Placement Trends</h5>
              <Line data={placementData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="soft-card">
            <Card.Body>
              <h5>Alumni Employment Status</h5>
              <Pie data={alumniData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="soft-card">
            <Card.Body>
              <h5>Department-wise Student Count</h5>
              <Bar data={departmentChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card className="soft-card">
            <Card.Body>
              <h5>Generate Custom Report</h5>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Report Type</Form.Label>
                      <Form.Select value={reportType} onChange={e => setReportType(e.target.value)}>
                        <option>Placement Report</option>
                        <option>Alumni Report</option>
                        <option>Department Report</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date Range</Form.Label>
                      <Form.Select value={dateRange} onChange={e => setDateRange(e.target.value)}>
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                        <option>Last 5 Years</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Format</Form.Label>
                      <Form.Select value={format} onChange={e => setFormat(e.target.value)}>
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Button className="btn btn-gradient" onClick={handleGenerateReport}>
                  Generate Report
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
    </div>
  );
};

export default Admin_ReportsAnalytics;