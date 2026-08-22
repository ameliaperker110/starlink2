import { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router";
import { plans } from "./plansPage";

export default function PaymentSuccess() {
  // Demo data.
  // Later, this could come from your own backend/API.
   const [myplan, setMyplan] = useState<any>({});
    const [phone, setPhone] = useState<any>("");
    const fetcher = useFetcher();
    const navigate = useNavigate();
  const order = {
    customer: phone,
    orderId: "#ORD-00412",
    dataPlan: myplan?.name,
    amountPaid: "ZMW "+ myplan?.price,
    kitId: "KIT_1787343765",
    status: "Active",
  };
  

  const handlePrint = () => {
    // Opens the browser's normal print dialog.
    window.print();
  };
  useEffect(() => {
      const planId = localStorage.getItem("selectedPlan") || 13;
      setMyplan(plans.find((plan) => plan.id === planId));
      setPhone(localStorage.getItem("phone"))
    }, [])

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

        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">

          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow">

            {/* ================= SUCCESS HEADER ================= */}

            <div className="bg-green-500 p-8 text-center text-white">

              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">

                <i className="uil uil-check text-5xl" />

              </div>

              <h1 className="text-3xl font-bold">
                Payment Successful!
              </h1>

              <p className="mt-2 text-green-100">
                Your demo Starlink data plan has been renewed.
              </p>

            </div>


            {/* ================= ORDER DETAILS ================= */}

            <div className="p-8">

              <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">

                {/* Customer */}

                <div>
                  <h3 className="mb-1 text-sm uppercase tracking-wider text-gray-500">
                    Customer
                  </h3>

                  <p className="text-lg font-bold text-gray-800">
                    {order.customer}
                  </p>
                </div>


                {/* Order ID */}

                <div>
                  <h3 className="mb-1 text-sm uppercase tracking-wider text-gray-500">
                    Order ID
                  </h3>

                  <p className="text-lg font-bold text-gray-800">
                    {order.orderId}
                  </p>
                </div>


                {/* Data Plan */}

                <div>
                  <h3 className="mb-1 text-sm uppercase tracking-wider text-gray-500">
                    Data Plan
                  </h3>

                  <p className="text-lg font-bold text-gray-800">
                    {order.dataPlan}
                  </p>
                </div>


                {/* Amount */}

                <div>
                  <h3 className="mb-1 text-sm uppercase tracking-wider text-gray-500">
                    Amount Paid
                  </h3>

                  <p className="text-lg font-bold text-gray-800">
                    {order.amountPaid}
                  </p>
                </div>


                {/* Kit ID */}

                <div>
                  <h3 className="mb-1 text-sm uppercase tracking-wider text-gray-500">
                    Starlink Kit ID
                  </h3>

                  <p className="break-all text-lg font-bold text-gray-800">
                    {order.kitId}
                  </p>
                </div>


                {/* Status */}

                <div>
                  <h3 className="mb-1 text-sm uppercase tracking-wider text-gray-500">
                    Status
                  </h3>

                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    <i className="uil uil-check-circle mr-1" />

                    {order.status}
                  </span>
                </div>

              </div>


              {/* ================= WHAT'S NEXT ================= */}

              <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-6">

                <div className="flex gap-4">

                  <i className="uil uil-info-circle text-2xl text-blue-600" />

                  <div>

                    <h4 className="font-bold text-blue-900">
                      What's next?
                    </h4>

                    <p className="mt-1 text-sm text-blue-800">
                     Your data plan will be activated within 15-30 minutes. You will receive a confirmation SMS on your MTN MoMo number.
                    </p>

                  </div>

                </div>

              </div>


              {/* ================= ACTION BUTTONS ================= */}

              <div className="flex flex-col gap-4 sm:flex-row">

                <a
                  href="/"
                  className="flex-1 rounded-xl bg-black py-4 text-center font-bold text-white transition hover:bg-gray-800"
                >
                  Back to Home
                </a>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 rounded-xl bg-gray-100 py-4 text-center font-bold text-gray-800 transition hover:bg-gray-200"
                >
                  <i className="uil uil-print mr-2" />
                  Download Receipt
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>


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
            className="flex flex-col items-center gap-1 text-gray-600"
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