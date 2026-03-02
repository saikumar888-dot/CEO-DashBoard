import { useNavigate } from "react-router-dom";

const Organization = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // frontend-only
    alert("Organization details saved");

    // NEXT STEP → LOGIN
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl w-full max-w-lg"
      >
        <h1 className="text-2xl font-semibold text-center mb-2">
          Organization Setup
        </h1>
        <p className="text-sm text-center text-slate-500 mb-6">
          Tell us about your organization
        </p>

        <input
          className="w-full border rounded-full px-4 py-2 mb-4"
          placeholder="Organization Name"
          required
        />

        <input
          className="w-full border rounded-full px-4 py-2 mb-4"
          placeholder="Industry"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-full">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Organization;