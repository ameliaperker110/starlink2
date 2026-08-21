import { useState } from "react";
import { useNavigate } from "react-router";

interface Plan {
  id: string;
  name: string;
  data: string;
  description: string;
  price: string;
}

export const plans: Plan[] = [
  {
    id: "13",
    name: "Basic Plan",
    data: "50GB",
    description: "Up to 12 devices. Perfect for small households.",
    price: "15.00",
  },
  {
    id: "14",
    name: "Standard Plan",
    data: "100GB",
    description: "Up to 25 devices. High-speed, low-latency internet.",
    price: "25.00",
  },
  {
    id: "15",
    name: "Premium Plan",
    data: "250GB",
    description: "Up to 50 devices. Best for high-demand users.",
    price: "45.00",
  },
  {
    id: "16",
    name: "Unlimited Plan",
    data: "Truly Unlimited",
    description:
      "Unlimited devices. Maximum performance for power users.",
    price: "95.00",
  },
];

export default function PlansSections() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    null
  );

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const selectPackage = (id: string) => {
    setSelectedPlan(id);
    setShowModal(true);

    // Simulate redirect/payment processing
    setTimeout(() => {
      console.log("Submitting package:", id);
      navigate("/payment");
      localStorage.setItem("selectedPlan", id);
      // Later you can replace this with:
      // navigate("/payment");
      // or an API request
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-[72px] pt-[72px]">

      {/* ================= HEADER ================= */}

      <header className="fixed left-0 right-0 top-0 z-50 bg-black text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

          <a href="/" className="flex items-center gap-2">
            <img
              src="/static/images/starlink_logo.png"
              alt="STARLINK"
              className="h-8"
            />

            <span className="ml-2 hidden border-l border-gray-600 pl-2 text-sm sm:inline">
              Zambia Reseller
            </span>
          </a>

          <nav className="hidden gap-6 md:flex">

            <a
              href="/dashboard/"
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <i className="uil uil-wifi" />
              <span>Status</span>
            </a>

            <a
              href="/plans/"
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <i className="uil uil-home" />
              <span>Plans</span>
            </a>

            <a
              href="/records/"
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <i className="uil uil-list-ul" />
              <span>Orders</span>
            </a>

          </nav>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-4 py-8">

        <div className="space-y-12">

          {/* ================= HERO ================= */}

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFCC00] to-[#FFD633] p-8 text-center text-white shadow sm:p-10">

            <div className="relative z-10">

              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                High-Speed Internet
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-gray-800 sm:text-xl">
                Experience the future of connectivity with our{" "}
                <strong>Shared Satellite Network</strong>. Using advanced{" "}
                <strong>Crowdsharing Technology</strong>, we deliver
                high-speed Starlink data directly to your smartphone,
                anywhere in Zambia. Choose your plan and join the network
                instantly using MTN MoMo.
              </p>

            </div>

            {/* Background overlay */}
            <div className="absolute left-0 top-0 h-full w-full opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent" />
            </div>

          </div>

          {/* ================= PLAN SECTION ================= */}

          <div>

            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
              <i className="uil uil-shopping-bag text-blue-600" />
              Select Your Plan
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-6">

              {plans.map((plan) => {

                const isSelected = selectedPlan === plan.id;

                return (
                  <div
                    key={plan.id}
                    onClick={() => selectPackage(plan.id)}
                    className={`
                      cursor-pointer
                      rounded-2xl
                      border-2
                      bg-white
                      p-6
                      shadow
                      transition-all
                      hover:-translate-y-1
                      hover:shadow-lg
                      ${
                        isSelected
                          ? "border-black bg-gray-50 ring-2 ring-black"
                          : "border-gray-200"
                      }
                    `}
                  >

                    {/* Plan Header */}

                    <div className="mb-4 flex items-start justify-between">

                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {plan.name}
                      </h3>

                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                        {plan.data}
                      </span>

                    </div>

                    {/* Description */}

                    <p className="mb-6 flex-grow text-sm text-gray-600">
                      {plan.description}
                    </p>

                    {/* Price */}

                    <div className="mt-auto">

                      <span className="text-3xl font-bold text-gray-900">
                        ZMW {plan.price}
                      </span>

                      <span className="text-xs text-gray-500">
                        /month
                      </span>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </main>

      {/* ================= PAYMENT MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">

            <div className="mb-6">

              {/* Spinner */}

              <div className="mx-auto mb-4 h-20 w-20 animate-spin rounded-full border-4 border-[#FFCC00] border-t-transparent" />

              <img
                src="/static/images/momo_logo.png"
                alt="MTN MoMo"
                className="mx-auto mb-4 h-12"
              />

            </div>

            <h3 className="mb-2 text-2xl font-bold text-gray-900">
              Processing...
            </h3>

            <p className="text-gray-600">
              Securely redirecting to MTN MoMo payment gateway
            </p>

            <p className="mt-4 text-sm text-gray-400">
              Please do not refresh the page
            </p>

          </div>

        </div>
      )}

      {/* ================= BOTTOM NAVIGATION ================= */}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-2xl">

        <div className="mx-auto flex max-w-7xl items-center justify-around px-2 py-2 sm:px-4 sm:py-3">

          <a
            href="/dashboard/"
            className="flex flex-col items-center gap-1 text-gray-600"
          >
            <i className="uil uil-wifi text-2xl" />
            <span className="text-xs font-semibold">
              Status
            </span>
          </a>

          <a
            href="/plans/"
            className="flex flex-col items-center gap-1 text-blue-600"
          >
            <i className="uil uil-shopping-bag text-2xl" />
            <span className="text-xs font-semibold">
              Plans
            </span>
          </a>

          <a
            href="/records/"
            className="flex flex-col items-center gap-1 text-gray-600"
          >
            <i className="uil uil-list-ul text-2xl" />
            <span className="text-xs font-semibold">
              Orders
            </span>
          </a>

          <a
            href="#"
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <i className="uil uil-setting text-2xl" />
            <span className="text-xs font-semibold">
              Settings
            </span>
          </a>

        </div>

      </nav>

    </div>
  );
}