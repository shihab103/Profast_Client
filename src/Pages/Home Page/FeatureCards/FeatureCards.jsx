import img1 from '../../../assets/tiny-deliveryman.png';
import img2 from '../../../assets/safe-delivery.png';
import img3 from '../../../assets/customer-top.png';

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: img1,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: img2,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: img3,
  },
];

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-center border rounded-2xl p-4 shadow hover:shadow-lg transition duration-300 bg-white"
        >
          {/* Left: Image */}
          <img
            src={feature.image}
            alt={feature.title}
            className="w-16 h-16 object-contain mr-4"
          />

          {/* Divider */}
          <div className="border-r border-dashed h-20 mr-4"></div>

          {/* Right: Text */}
          <div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
