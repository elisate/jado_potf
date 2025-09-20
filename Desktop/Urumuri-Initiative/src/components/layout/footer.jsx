
import { Facebook, Twitter, Linkedin, MapPin, Phone, Mail, ArrowRight,Youtube} from "lucide-react"

export default function Footer() {
  return (
    <footer className="left-0  bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="py-16 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
         
          {/*Our Office*/}
          <div>
            <h3 className="text-white font-bold text-lg mb-4  pb-2">Our Office</h3>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300 font-medium">KN 5 Rd, Kigali, Rwanda</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">+250 788 123 456</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">support@rnrs.rw</p>
                </div>
              </div>
            </div>
         {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              <div className="w-10 h-10 bg-red-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors cursor-pointer group">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-red-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors cursor-pointer group">
                <Twitter className="w-5 h-5 text-white " />
              </div>
              <div className="w-10 h-10 bg-red-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors cursor-pointer group">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
               <div className="w-10 h-10 bg-red-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors cursor-pointer group">
                <Youtube className="w-5 h-5 text-white" />
              </div>
            </div>
         
          </div>
          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4  pb-2">Service</h3>
            <ul className="space-y-2">
              {[
                "Financial Investment",
                "Cash Investment",
                "Financial Consultancy",
                "Business Loans",
                "Business Analysis"
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 text-white" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

               {/* Quick Link */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4  pb-2">Quick Link</h3>
            <ul className="space-y-2">
              {[
                "About Us",
                "Contact Us",
                "Our Service",
                "Terms and Condition",
                "Support"
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 text-white" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

                   {/* News Letter*/}
          <div>
            <h3 className="text-white font-bold text-lg mb-4  pb-2">News Letter</h3>
              <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates on products and sustainability initiatives.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white w-[200px] py-1 px-2" />
              <button  
               suppressHydrationWarning={true} 
               className="bg-red-800 hover:bg-red-900 px-1 py-1 rounded-1xl">
                Subscribe</button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6 px-4 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} RNRS Digital Platform. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}