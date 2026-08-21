import { useEffect, useState } from "react";

interface NetworkStats {
  download: string;
  upload: string;
  ping: number;
  jitter: number;
  dataUsed: string;
  dataLimit: number;
}

const generateNetworkStats = (): NetworkStats => {
  return {
    download: (Math.random() * 100 + 100).toFixed(2),
    upload: (Math.random() * 20 + 20).toFixed(2),
    ping: Math.floor(Math.random() * 40 + 20),
    jitter: Math.floor(Math.random() * 8 + 2),
    dataUsed: (Math.random() * 30 + 20).toFixed(1),
    dataLimit: 100,
  };
};

export default function NetworkStatus() {
  const [stats, setStats] = useState<NetworkStats>({
    download: "--",
    upload: "--",
    ping: 0,
    jitter: 0,
    dataUsed: "0",
    dataLimit: 100,
  });

  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    setStats(generateNetworkStats());
  }, []);

  const runSpeedTest = () => {
    setIsTesting(true);

    setTimeout(() => {
      setStats(generateNetworkStats());
      setIsTesting(false);
    }, 2500);
  };

  const percentage =
    (Number(stats.dataUsed) / stats.dataLimit) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-[72px] pt-[72px]">
      {/* Fixed Header */}
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

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-6">

          {/* Choose Package */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-1 shadow">
            <button
              onClick={() => {
                window.location.href = "/plans/";
              }}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-5 font-black tracking-wider text-white shadow-xl transition-all hover:from-blue-700 hover:to-blue-900 active:scale-95"
            >
              <i className="uil uil-shopping-bag text-2xl" />
              <span className="text-lg uppercase">
                Choose Your Package
              </span>
            </button>
          </div>

          {/* Service Information */}
          <div className="rounded-3xl bg-gradient-to-br from-gray-800 to-black p-6 text-white shadow sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 sm:text-sm">
                  Service Information
                </p>

                <h1 className="mt-2 text-2xl font-black sm:text-3xl">
                  Starlink Zambia
                </h1>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 bg-opacity-20 sm:h-20 sm:w-20">
                <i className="uil uil-satellite text-4xl text-blue-400 sm:text-5xl" />
              </div>
            </div>

            <p className="text-sm text-gray-400">
              Select a plan to activate high-speed satellite internet.
            </p>
          </div>

          {/* Network Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">

            {/* Download */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
                  Download
                </p>

                <i className="uil uil-arrow-down text-lg text-blue-600 sm:text-xl" />
              </div>

              <p className="text-2xl font-black text-gray-900 sm:text-3xl">
                {stats.download}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Mbps
              </p>
            </div>

            {/* Upload */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
                  Upload
                </p>

                <i className="uil uil-arrow-up text-lg text-green-600 sm:text-xl" />
              </div>

              <p className="text-2xl font-black text-gray-900 sm:text-3xl">
                {stats.upload}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Mbps
              </p>
            </div>

            {/* Ping */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
                  Ping
                </p>

                <i className="uil uil-pulse text-lg text-orange-600 sm:text-xl" />
              </div>

              <p className="text-2xl font-black text-gray-900 sm:text-3xl">
                {stats.ping || "--"}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                ms
              </p>
            </div>

            {/* Jitter */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
                  Jitter
                </p>

                <i className="uil uil-wave text-lg text-purple-600 sm:text-xl" />
              </div>

              <p className="text-2xl font-black text-gray-900 sm:text-3xl">
                {stats.jitter || "--"}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                ms
              </p>
            </div>
          </div>

          {/* Data Usage */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="uil uil-database text-2xl text-blue-600" />

                <h3 className="text-lg font-bold text-gray-900">
                  Data Usage
                </h3>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                {percentage.toFixed(0)}%
              </span>
            </div>

            <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-600">
              <span>{stats.dataUsed} GB</span>
              <span>{stats.dataLimit} GB</span>
            </div>
          </div>

          {/* Speed Test */}
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={runSpeedTest}
              disabled={isTesting}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 font-bold text-gray-900 shadow transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isTesting ? (
                <>
                  <i className="uil uil-spinner-alt animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <i className="uil uil-bolt text-blue-600" />
                  Run Diagnostic Test
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-around px-2 py-2 sm:px-4 sm:py-3">

          <a
            href="/dashboard/"
            className="flex flex-col items-center gap-1 text-blue-600"
          >
            <i className="uil uil-wifi text-2xl" />
            <span className="text-xs font-semibold">
              Status
            </span>
          </a>

          <a
            href="/plans/"
            className="flex flex-col items-center gap-1 text-gray-600 transition-all"
          >
            <i className="uil uil-shopping-bag text-2xl" />
            <span className="text-xs font-semibold">
              Plans
            </span>
          </a>

          <a
            href="/records/"
            className="flex flex-col items-center gap-1 text-gray-600 transition-all"
          >
            <i className="uil uil-list-ul text-2xl" />
            <span className="text-xs font-semibold">
              Orders
            </span>
          </a>

          <a
            href="#"
            className="flex flex-col items-center gap-1 text-gray-600 transition-all hover:text-blue-600"
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