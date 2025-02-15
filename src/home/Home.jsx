import Header from "@/components/ui/custom/Header";
import { UserButton } from "@clerk/clerk-react";
import { AtomIcon, Edit, Share2 } from "lucide-react";
import React from "react";

function Home() {
  return (
    <div>
      <Header />
      <div>
        <section>
          <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-8 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Build Your Resume <span className="text-primary">With AI</span>{" "}
            </h1>
            <p className="mb-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Effortlessly Craft a Standout Resume with Our AI-Powered Builder
            </p>
            <div className="flex flex-col mb-4 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="/dashboard"
                className="inline-flex justify-center bg-[#9f5bff] items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg hover:bg-[#2a104f] focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Get Started
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </section>
        <section className="py-4 bg-white px-4 mx-auto max-w-screen-xl text-center lg:py-8 lg:px-12">
          <h2 className="font-bold text-3xl">How it Works?</h2>
          <h2 className="text-md text-gray-500 mb-4">
            Give mock interview in just 3 simple easy steps
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border bg-white border-gray-200 p-6 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <AtomIcon className="h-8 w-8" />
              <h2 className="mt-2 text-xl font-bold text-black">
                Write prompt for your form
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>

            <a
              className="block rounded-xl border bg-white border-gray-200 p-6 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Edit className="h-8 w-8" />
              <h2 className="mt-2 text-xl font-bold text-black">
                Edit Your form
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>

            <a
              className="block rounded-xl border bg-white border-gray-200 p-6 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Share2 className="h-8 w-8" />
              <h2 className="mt-2 text-xl font-bold text-black">
                Share & Start Accepting Responses
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
