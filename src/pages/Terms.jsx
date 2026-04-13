import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-10 pt-16 md:pt-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-premium border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <FileText size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-text-primary">Terms of Service</h1>
              <p className="text-text-secondary mt-1">Effective Date: October 2023</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none prose-headings:font-black prose-headings:text-text-primary prose-p:text-text-secondary prose-p:leading-relaxed">
            <h2>1. Contractual Relationship</h2>
            <p>
              These Terms of Use ("Terms") govern the access or use by you, an individual, of applications, websites, content, products, and services made available by Tomato Food Delivery. Please read these terms carefully before accessing or using the Services.
            </p>

            <h2>2. The Services</h2>
            <p>
              The Services constitute a technology platform that enables users of Tomato's mobile applications or websites to arrange and schedule delivery services and/or logistics services with independent third party providers of such services, including independent third party delivery providers and independent third party restaurant partners.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              In order to use most aspects of the Services, you must register for and maintain an active personal user Services account. Account registration requires you to submit certain personal information, such as your name, address, mobile phone number and age, as well as valid payment method.
            </p>

            <h2>4. Payment</h2>
            <p>
              You understand that use of the Services may result in charges to you for the services or goods you receive from a Third Party Provider. After you have received services or goods obtained through your use of the Service, Tomato will facilitate your payment of the applicable Charges.
            </p>

            <h2>5. Disclaimers; Limitation of Liability</h2>
            <p>
              The services are provided "as is" and "as available." Tomato disclaims all representations and warranties, express, implied or statutory, not expressly set out in these terms. We do not guarantee the quality, suitability, safety or ability of third party providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
