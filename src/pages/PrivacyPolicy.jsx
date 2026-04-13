import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-10 pt-16 md:pt-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-premium border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Shield size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-text-primary">Privacy Policy</h1>
              <p className="text-text-secondary mt-1">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none prose-headings:font-black prose-headings:text-text-primary prose-p:text-text-secondary prose-p:leading-relaxed">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We may use the information we collect about you to:</p>
            <ul className="list-disc pl-5 space-y-2 text-text-secondary">
              <li>Provide, maintain, and improve our Services.</li>
              <li>Perform internal operations, including, for example, to prevent fraud and abuse of our Services.</li>
              <li>Send or facilitate communications between you and a Delivery Partner.</li>
              <li>Personalize and improve the Services, including to provide or recommend features, content, social connections, referrals, and advertisements.</li>
            </ul>

            <h2>3. Sharing of Information</h2>
            <p>
              We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-text-secondary">
              <li>With Delivery Partners to enable them to provide the Services you request. For example, we share your name, delivery address, and order details with Delivery Partners.</li>
              <li>With Restaurant Partners to enable them to prepare your food.</li>
              <li>In response to a request for information by a competent authority.</li>
            </ul>

            <h2>4. Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
