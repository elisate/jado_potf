"use client"


import { useState,useEffect} from "react"
import CountUp from "react-countup"
import { ShieldCheck, Users, Award, CheckCircle, Clock,User2Icon} from "lucide-react"
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import WhyChooseUs from "@/components/whychooseus"
import JobFinder from "./JobFinder/page"
import PayrollTabs from "./ServicesA/page"
export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Story")
  const [guideTab,setGuideTab]=useState("Organization")
  const guideSteps = {
  Organization: [
  "Go to 'SalaryFund' via the RNRS navigation bar.",
  "Click on 'Add your Organization'.",
  "Provide organization info, upload documents, and submit.",
  "An assigned agent will visit and physically verify your documents.",
  "Once approved, receive your unique organization code.",
  "Share the code with your employees and approve their registration.",
  "Sign payroll contracts and start working with us."
  ],
  Employee: [
   "Go to 'SalaryFund' via the RNRS navigation bar.",
  "Click on 'Open Account' under the Employee section.",
  "Enter your personal information (names, phone number, gender, etc.).",
  "Select your ID type and provide the identification number.",
  "Create and confirm a secure 6-digit PIN.",
  "Enter the organization code shared by your employer.",
  "Submit your information and wait for approval before signing the payroll contract."
  ],
  JobSeeker: [
   "Go to 'SalaryFund' via the RNRS navigation bar.",
  "Click on 'Register as Job Seeker'.",
  "Fill in your personal details (name, contact info, skills, etc.).",
  "Upload your CV or relevant documents (if applicable).",
  "Create and confirm a secure 6-digit PIN or password.",
  "Browse available jobs or apply using the platform.",
  "Receive notifications about job applications and updates."
  ],
  JobProvider: [
  "Go to 'SalaryFund' via the RNRS navigation bar.",
  "Click on 'Register as Job Provider'.",
  "Fill in your organization or personal details.",
  "Upload necessary documents for verification.",
  "Create and confirm a secure login PIN or password.",
  "Post job listings with details and requirements.",
  "Manage applications and communicate with job seekers."
  ],
};

  const tabContent = {
    Story: `In Rwanda, delayed salaries and limited financial services leave many vulnerable. We provide payroll solutions, early payments, and financial support to boost the economy.`,
    Mission: `Our mission at RNRS is to create a transparent and reliable payroll system that empowers agents and organizations with the tools they need to ensure timely salary payments, financial clarity, and economic growth.`,
    Vision: `We envision a future where salary delays are eliminated, and every Rwandan has access to efficient financial services that improve quality of life and drive national progress.`,
  }
<<<<<<< HEAD

  const categories = [
    { name: "Farming", wage: "1,250 - 2,000 RWF", description: "Agricultural work including land and swamp farming" },
    { name: "Building", wage: "1,500 - 2,500 RWF", description: "Construction and building maintenance work" },
    { name: "Cleaning", wage: "1,000 - 1,500 RWF", description: "Cleaning and maintenance services" },
    { name: "Gardening", wage: "1,200 - 1,800 RWF", description: "Garden maintenance and landscaping" },
    { name: "Security", wage: "1,800 - 2,500 RWF", description: "Security and protection services" },
  ]
=======
>>>>>>> 7dc7f5415b97988372f054482eff08d9a1c51d47
   const images = [
    "/homep2.jpg",
    "/homep1.jpg",
      "/homep6.jpg",
        "/homep7.jpg",
          "/homep11.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const Statistics = [
  { Icon: <Users/>, Text: "Happy Clients", Number: 702 },
  { Icon:<CheckCircle/>, Text: "Projects Completed", Number: 120 },
  { Icon: <User2Icon/>, Text: "Team Members", Number: 15 },
  { Icon: <Award/>, Text: "Years of Experience", Number: 5 },
];
  return (
    <div className=" min-h-screen  bg-white text-black font-serif relative">

<<<<<<< HEAD
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 "
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "background-image 1s ease-in-out",
        }}
        >
      
          {/*Dark Overlay*/}
          <div className="absolute inset-0 bg-black/50 bg-opacity-40 z-10" />
          {/* Text content*/}
          <div className=" relative z-20 max-w-2xl text-white  font-serif">
          <h1 className="text-5xl md:text-3xl font-bold italic text-amber-300">
            RNRS: Revolutionizing Payroll in Rwanda
          </h1>
           
           <p className="text-base md:text-lg mb-12 mt-6 leading-relaxed opacity-90 max-w-3xl mx-auto">
            RNRS uses advanced technology to simplify and automate payroll management, ensuring timely and accurate salary payments. It also connects job seekers with employers, matching individuals to roles based on their skills, helping both parties meet their employment goals efficiently and securely.
             </p>
            <div className="flex flex-row gap-5 items-center justify-center ">
             <Link href="/SalaryFund">
            <button className=" bg-red-900 text-white px-6 py-2 font-bold  hover:bg-red-700 transition duration-300">
            Let's Work Together
            </button>
          </Link>
             <Link href="/#about">
            <button className=" bg-red-900 text-white px-6 py-2 font-bold  hover:bg-red-700 transition duration-300">
              Explore More 
            </button>
          </Link>
          </div>
          </div>
       
      </section>
      <WhyChooseUs/>

      {/* Account Opening and About Section */}
      <section className="py-20 px-4 md:px-20 bg-gray-50" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Side: Account Opening */}
       <Card className="shadow-xl border-0 overflow-hidden w-[500px]">
  <div className="bg-gradient-to-r from-red-800 to-red-700 p-6 text-white">
    <h2 className="text-2xl font-bold mb-2">RNRS Account Opening</h2>
    <p className="text-red-100">Quick and easy account setup process</p>
  </div>
  
  {/* Tab buttons */}
  <div className="flex mb-6 mt-6 ">
    {["Organization", "Employee", "JobSeeker", "JobProvider"].map((tabs) => (
      <Button
        key={tabs}
        onClick={() => setGuideTab(tabs)}
        variant={guideTab === tabs ? "default" : "outline"}
        className={`px-4 py-2 ml-1.5 mr-1.5 rounded-lg font-medium transition-all duration-200 ${
          guideTab === tabs
            ? "bg-red-800 hover:bg-red-900 text-white"
            : "border-red-200 text-red-800 hover:bg-red-50"
        }`}
      >
        {tabs}
      </Button>
    ))}
  </div>

  {/* Tab content */}

  <CardContent className="p-6">
    <h3 className="text-lg font-semibold mb-4 text-red-900">Step-by-Step Guide:</h3>
      <div className="space-y-3">
    {guideSteps[guideTab].map((step, index) => (
      <div key={index} className="flex items-start gap-3">
        <div className="bg-yellow-400 text-red-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
          {index + 1}
        </div>
        <p className="text-gray-700 text-sm">{step}</p>
      </div>
    ))}
  </div>
  </CardContent>
</Card>

=======
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/strategy2.jpg")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r to-red-100/70" />
        </div>

        <div className="relative z-10 text-center text-white px-6 md:px-20 max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your <span className="text-yellow-400">Payroll Status</span> is Our Goal
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl mb-8 font-light max-w-4xl mx-auto leading-relaxed">
              Transforming Rwanda's payroll landscape with innovative solutions for timely salary payments, financial
              transparency, and economic empowerment.
            </p>
            <p className="text-lg md:text-xl mb-12 leading-relaxed opacity-90 max-w-3xl mx-auto">
              At RNRS, we revolutionize payroll management with cutting-edge technology that ensures employees receive
              their salaries on time while providing employers with flexible payment solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Account Opening & About RNRS */}
      <section className="py-20 px-4 md:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Account Opening */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-red-800 to-red-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Xpress Account Opening</h2>
                <p className="text-red-100">Quick and easy account setup process</p>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-900">Step-by-Step Guide:</h3>
                <div className="space-y-3">
                  {[
                    "Dial *883#",
                    "Select Open Xpress Account",
                    "Select Agree",
                    "Enter personal details (name, DOB, gender)",
                    "Select ID type and enter National ID",
                    "Create and confirm 6-digit PIN",
                    "Enter Referral Code: 32645304608",
                    "Receive SMS with Account Number",
                    "Set up Security Questions",
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-yellow-400 text-red-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
>>>>>>> gisele-features

            {/* Right: About RNRS Tabs */}
            <div className="space-y-8">
              <div>
              <div className="bg-white w-fit rounded-1xl border border-red-900 px-4 py-1 mb-5 text-red-900"> About Us</div>
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight">We help our Clients To Grow Their Business</h2>
             </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {["Story", "Mission", "Vision"].map((tab) => (
                  <Button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    variant={activeTab === tab ? "default" : "outline"}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-red-800 hover:bg-red-900 text-white"
                        : "border-red-200 text-red-800 hover:bg-red-50"
                    }`}
                  >
                    {tab}
                  </Button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-800">
                <p className="text-gray-700 leading-relaxed">{tabContent[activeTab]}</p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <ShieldCheck className="w-8 h-8 text-red-800 mx-auto mb-2" />
                  <h4 className="font-semibold text-red-900">Secure</h4>
                  <p className="text-sm text-gray-600">Bank-level security</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <Clock className="w-8 h-8 text-red-800 mx-auto mb-2" />
                  <h4 className="font-semibold text-red-900">Fast</h4>
                  <p className="text-sm text-gray-600">Instant processing</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <Users className="w-8 h-8 text-red-800 mx-auto mb-2" />
                  <h4 className="font-semibold text-red-900">Reliable</h4>
                  <p className="text-sm text-gray-600">24/7 support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
<<<<<<< HEAD
   <div className="w-full bg-red-800 text-white grid grid-cols-2 md:grid-cols-4 py-5 px-10 gap-6">
      {Statistics.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-1">
          <div>{item.Icon}</div>
          <div className="text-sm">{item.Text}</div>
          <div className="text-2xl font-bold">
            <CountUp end={item.Number} duration={2} />
          </div>
        </div>
      ))}
    </div>
     {/* Payroll services */}
     <div id="service">
     <PayrollTabs/>
     
     {/* Job Finder */}
     <JobFinder/>
     </div>
=======

      {/* Core Services */}
      <section className="py-20 px-4 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-400 text-red-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Services
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-red-800">Revolutionary</span> Payroll Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive payroll management designed for Rwanda's growing economy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Early Salary Access */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
              <div className="bg-gradient-to-br from-red-800 to-red-700 p-6 text-white">
                <Wallet className="w-12 h-12 mb-4 text-yellow-400" />
                <h3 className="text-xl font-bold mb-2">Early Salary Access</h3>
                <p className="text-red-100 text-sm">Access your weekly salary anytime with just 5% transaction fee</p>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {[
                    "Weekly salary requests",
                    "5% transaction fee",
                    "3% salary deposit (refundable)",
                    "Instant processing",
                    "Mobile-friendly interface",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Flexible Payment Plans */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 p-6 text-red-900">
                <Clock className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Flexible Payment Plans</h3>
                <p className="text-red-800 text-sm">Employers can pay one month in two months to improve cash flow</p>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {[
                    "Improved cash flow management",
                    "Flexible payment schedules",
                    "Reduced financial pressure",
                    "Automated processing",
                    "Real-time tracking",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Financial Security */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 text-white">
                <ShieldCheck className="w-12 h-12 mb-4 text-yellow-400" />
                <h3 className="text-xl font-bold mb-2">Financial Security</h3>
                <p className="text-gray-100 text-sm">Bank-level security with comprehensive financial protection</p>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {[
                    "End-to-end encryption",
                    "Secure transactions",
                    "Fraud protection",
                    "Regular security audits",
                    "Compliance guaranteed",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-20 px-4 md:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-red-800 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Job Categories
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Work or Workers <span className="text-red-800">Easily</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect employers with skilled workers across various industries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Selector */}
            <div className="pt-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                      selectedCategory === category.name
                        ? "bg-red-800 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <div className="font-medium">{category.name}</div>
                    <div className={`text-sm ${selectedCategory === category.name ? "text-red-100" : "text-gray-500"}`}>
                      {category.wage}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Details */}
            <div className="lg:col-span-3">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-full">
                    <img
                      src="/homepic.jpg"
                      alt={`${selectedCategory} work`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{selectedCategory}</h3>
                      <p className="text-yellow-400 font-semibold">
                        {categories.find((c) => c.name === selectedCategory)?.wage} RWF/day
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Find {selectedCategory} Workers</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {categories.find((c) => c.name === selectedCategory)?.description}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-700">Verified workers</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-700">Fair wage standards</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-700">Secure payments</span>
                      </div>
                    </div>

                    <div>
                      <select className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-red-600 focus:border-transparent">
                        <option>Select work type</option>
                        <option>{selectedCategory} - Land work</option>
                        <option>{selectedCategory} - Specialized work</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
>>>>>>> gisele-features
    </div>
  )
}