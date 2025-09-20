"use client"

import { useState } from "react"
import { Users, Target, Eye, Award } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Added CardHeader, CardTitle

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("Story")
  const tabContent = {
    Story: `RNRS was born from the urgent need to solve salary delays affecting millions in Rwanda. Our platform bridges gaps between employers, employees, and financial services to bring timely payments and transparency. We are committed to fostering financial stability and empowering individuals across the nation.`,
    Mission: `Our mission is to empower every Rwandan through innovative payroll technology, ensuring reliable salary access, boosting financial inclusion, and stimulating economic growth. We strive to create a seamless and secure financial ecosystem for all.`,
    Vision: `We envision a Rwanda where no worker waits for their salary, where financial services are accessible, trustworthy, and empower prosperity for all. We aim to be the leading force in transforming the financial landscape of Rwanda.`,
  }

  return (
    <main className="py-16 px-4 md:px-8 lg:px-20 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#8B0000] mb-4 leading-tight">About RNRS</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Discover our journey, purpose, and the values that drive us to empower financial stability in Rwanda.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["Story", "Mission", "Vision"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out ${
              activeTab === tab
                ? "bg-red-800 text-white hover:bg-red-900 shadow-md"
                : "border-red-300 text-red-800 hover:bg-red-50 hover:border-red-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <Card className="border-l-8 border-red-800 shadow-xl p-8 md:p-10 bg-white rounded-lg">
        <CardContent className="p-0">
          {" "}
          {/* Remove default CardContent padding */}
          <p className="text-gray-700 leading-relaxed text-lg md:text-xl">{tabContent[activeTab]}</p>
        </CardContent>
      </Card>

      {/* Core Values */}
      <section className="mt-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-red-900 mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="flex flex-col items-center p-8 text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
            <Users className="w-14 h-14 text-red-800 mb-6" />
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-2xl font-bold text-red-900">Community</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600 text-base">
                We put the people first and build trustworthy connections, fostering a supportive environment for all.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center p-8 text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
            <Target className="w-14 h-14 text-red-800 mb-6" />
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-2xl font-bold text-red-900">Focus</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600 text-base">
                Dedicated to solving payroll challenges and enhancing financial access with precision and commitment.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center p-8 text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
            <Eye className="w-14 h-14 text-red-800 mb-6" />
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-2xl font-bold text-red-900">Transparency</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600 text-base">
                Clear, reliable processes everyone can trust, ensuring honesty and openness in all our operations.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center p-8 text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
            <Award className="w-14 h-14 text-red-800 mb-6" />
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-2xl font-bold text-red-900">Excellence</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600 text-base">
                Striving to deliver the highest quality service and innovative solutions that exceed expectations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
