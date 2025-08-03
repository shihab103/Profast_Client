import Marquee from "react-fast-marquee";

import company1 from "../../../assets/brands/amazon.png";
import company2 from "../../../assets/brands/amazon_vector.png";
import company3 from "../../../assets/brands/casio.png";
import company4 from "../../../assets/brands/moonstar.png";
import company5 from "../../../assets/brands/randstad.png";
import company6 from "../../../assets/brands/start-people 1.png";
import company7 from "../../../assets/brands/start.png";

const ClientLogo = () => {
  const companyLogos = [
    company1,
    company2,
    company3,
    company4,
    company5,
    company6,
    company7,
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">We Have Helped Companies</h2>
        <p className="text-gray-600 mt-2">
          Trusted by businesses across Bangladesh
        </p>
      </div>

      <Marquee
        speed={50}
        direction="right"
        pauseOnHover={true}
        gradient={false}
      >
        {companyLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Company ${index + 1}`}
            className="h-7 mx-5"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default ClientLogo;
