import React from "react";

const Contributions = () => {
  return (
    <div className="p-6 space-y-6">
      <section>
        <h2 className="text-xl font-bold mb-4">Contributions - Donate</h2>
        <Donate />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Contributions - Sponsor Event</h2>
        <SponsorEvent />
      </section>
    </div>
  );
};

const Donate = () => {
  return (
    <div className="border p-4 mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="md:w-3/4">
        <h3 className="text-lg font-semibold mb-2">Support Our Mission</h3>
        <p className="mb-2 text-gray-700">
          Help us empower future generations by donating to our alumni fund.
        </p>
      </div>
      <button className="w-full md:w-auto mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Donate Now
      </button>
    </div>
  );
};

const SponsorEvent = () => {
  return (
    <div className="border p-4 mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="md:w-3/4">
        <h3 className="text-lg font-semibold mb-2">Sponsor an Alumni Event</h3>
        <p className="mb-2 text-gray-700">
          Become a proud sponsor and support meaningful alumni gatherings and programs.
        </p>
      </div>
      <button className="w-full md:w-auto mt-4 md:mt-0 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Sponsor Event
      </button>
    </div>
  );
};

export default Contributions;
