import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Contact = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-10 pt-16 md:pt-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:max-w-6xl">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-4">We'd love to hear from you</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-premium border border-gray-100 h-full">
              <h3 className="text-2xl font-black text-text-primary mb-8">Get in Touch</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">Headquarters</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      123 Food Street, Netaji Subhash Place,<br />New Delhi, India 110034
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">Phone</h4>
                    <p className="text-sm text-text-secondary">+91 9369420619</p>
                    <p className="text-xs text-gray-400 mt-0.5">Mon-Fri from 9am to 6pm</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">Email</h4>
                    <p className="text-sm text-text-secondary">pv254424@tomato.food</p>
                    <p className="text-sm text-text-secondary">support@tomato.food</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-orange-50 rounded-2xl border border-orange-100 flex gap-4">
                <Clock className="text-orange-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-text-primary text-sm mb-1">24/7 Food Support</h4>
                  <p className="text-xs text-orange-800 leading-relaxed">For live order tracking or immediate assistance, please use the in-app chat.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-premium border border-gray-100">
              <h3 className="text-2xl font-black text-text-primary mb-8">Send us a message</h3>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="First Name" placeholder="John" />
                  <Input label="Last Name" placeholder="Doe" />
                </div>
                
                <Input label="Email Address" type="email" placeholder="john@example.com" />
                <Input label="Subject" placeholder="How can we help?" />
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary ml-1 block">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell us more about your query..."
                    className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl p-4 text-sm font-medium outline-none transition-all resize-none"
                  />
                </div>
                
                <Button className="w-full py-4 rounded-2xl text-lg shadow-xl shadow-primary/20 mt-4">
                  Send Message <Send size={18} className="ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
