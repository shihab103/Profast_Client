import Image from "../../../assets/location-merchant.png";
import bgImage from "../../../assets/be-a-merchant-bg.png";

const Merchant = () => {
  return (
    <div
      className="bg-[#03373d] rounded-2xl mt-10 bg-cover bg-no-repeat  bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex rounded-2xl flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-8 text-white bg-[#03373d]/90">
        {/* Left Side - Text Content */}
        <div className="md:w-1/2 text-start space-y-6">
          <h1 className="font-bold text-3xl md:text-4xl leading-snug">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="text-gray-200 text-base">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#caeb66] text-[#03373d] px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
              Become a Merchant
            </button>
            <button className="border text-[#caeb66] border-[[#caeb66]] px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-[#03373d] transition">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Right Side - Image (for smaller screen only shows background) */}
        <div className="hidden md:block md:w-1/2">
          <img src={Image} alt="Merchant Location" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Merchant;
