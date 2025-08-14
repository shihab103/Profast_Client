import React, { useState } from "react";
import { useForm } from "react-hook-form";
import allData from "../../assets/warehouses.json";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const timePart = date.getTime().toString().slice(-5);
  return `PCL-${datePart}${timePart}`;
};

const AddParcel = () => {
  const [parcelType, setParcelType] = useState("Document");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [receiverDistrict, setReceiverDistrict] = useState("");
  const [weight, setWeight] = useState("");

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const districts = allData.map((item) => item.district);
  const senderAreas =
    allData.find((item) => item.district === selectedDistrict)?.covered_area ||
    [];
  const receiverAreas =
    allData.find((item) => item.district === receiverDistrict)?.covered_area ||
    [];

  const pickupDistrict = watch("pickupDistrict");
  const receiverDist = watch("receiverDistrict");

  const calculateCost = (type, weight, sameDistrict) => {
    let baseCost = 0;
    let extraCharges = 0;
    let deliveryZone = sameDistrict ? "Within City" : "Outside City/District";

    if (type === "Document") {
      baseCost = sameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) {
        baseCost = sameDistrict ? 110 : 150;
      } else {
        const extraKg = weight - 3;
        extraCharges = extraKg * 40;
        baseCost = sameDistrict ? 110 + extraCharges : 150 + extraCharges + 40;
      }
    }

    return {
      total: baseCost,
      breakdown: {
        parcelType: type,
        weight: `${weight} kg`,
        deliveryZone,
        baseCost: `৳${
          sameDistrict
            ? type === "Document"
              ? 60
              : 110
            : type === "Document"
            ? 80
            : 150
        }`,
        extraCharges: `৳${
          extraCharges +
          (!sameDistrict && type === "Non-document" && weight > 3 ? 40 : 0)
        }`,
      },
    };
  };

  const onSubmit = (data) => {
    const weightNum = parseFloat(data.parcelWeight);
    const sameDistrict = data.pickupDistrict === data.receiverDistrict;
    const { total, breakdown } = calculateCost(
      parcelType,
      weightNum,
      sameDistrict
    );

    Swal.fire({
      title: `Total Cost: ৳${total}`,
      html: `
        <strong>Breakdown:</strong><br/>
        <ul style="text-align: left">
          <li><strong>Parcel Type:</strong> ${breakdown.parcelType}</li>
          <li><strong>Weight:</strong> ${breakdown.weight}</li>
          <li><strong>Delivery Zone:</strong> ${breakdown.deliveryZone}</li>
          <li><strong>Base Cost:</strong> ${breakdown.baseCost}</li>
          <li><strong>Extra Charges:</strong> ${breakdown.extraCharges}</li>
        </ul>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          parcelType,
          cost: total,
          payment_status: "unpaid",
          delivery_status: "not collected",
          created_by: user.email,
          tracking_id: generateTrackingID(),
          creation_date: new Date().toISOString(),
        };
        console.log("Submitted Parcel:", parcelData);

        // save data to the server
        axiosSecure.post("/parcels", parcelData).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire("Success", "Parcel Submitted Successfully", "success");
          }
        });
      }
    });
  };

  // Watch for live breakdown
  const showBreakdown =
    parcelType && weight && pickupDistrict && receiverDist && !isNaN(weight);

  const breakdownData = showBreakdown
    ? calculateCost(
        parcelType,
        parseFloat(weight),
        pickupDistrict === receiverDist
      )
    : null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <h2 className="text-3xl font-bold text-center text-primary">
        Add Parcel
      </h2>
      <p className="text-center text-lg">Enter your parcel details</p>

      <input
        {...register("parcelName", { required: true })}
        type="text"
        placeholder="Parcel Name"
        className="input input-bordered w-full max-w-md mx-auto block mt-2"
      />
      {errors.parcelName && (
        <p className="text-red-500 text-sm text-center">
          Parcel name is required.
        </p>
      )}

      <div className="flex justify-center gap-4 items-center">
        <span className="font-medium">Parcel Type:</span>
        <label className="label cursor-pointer gap-2">
          <input
            type="radio"
            value="Document"
            className="radio"
            checked={parcelType === "Document"}
            onChange={() => setParcelType("Document")}
          />
          <span className="label-text">Document</span>
        </label>
        <label className="label cursor-pointer gap-2">
          <input
            type="radio"
            value="Non-document"
            className="radio"
            checked={parcelType === "Non-document"}
            onChange={() => setParcelType("Non-document")}
          />
          <span className="label-text">Non-document</span>
        </label>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Sender Details</h3>
          <input
            {...register("senderName", { required: true })}
            type="text"
            placeholder="Sender Name"
            className="input input-bordered w-full"
          />
          <input
            {...register("senderPhone", { required: true })}
            type="text"
            placeholder="Sender Phone"
            className="input input-bordered w-full"
          />
          <select
            {...register("pickupDistrict", { required: true })}
            className="select select-bordered w-full"
            defaultValue=""
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option disabled value="">
              Select Pickup District
            </option>
            {districts.map((district, i) => (
              <option key={i} value={district}>
                {district}
              </option>
            ))}
          </select>
          <select
            {...register("pickupWarehouse", { required: true })}
            className="select select-bordered w-full"
            disabled={!selectedDistrict}
            defaultValue=""
          >
            <option disabled value="">
              {selectedDistrict
                ? "Select Covered Area"
                : "Select District First"}
            </option>
            {senderAreas.map((area, i) => (
              <option key={i} value={area}>
                {area}
              </option>
            ))}
          </select>
          <textarea
            {...register("pickupInstructions")}
            placeholder="Pickup Instructions"
            className="textarea textarea-bordered w-full"
            rows={3}
          ></textarea>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">
            Receiver Details
          </h3>
          <input
            {...register("receiverName", { required: true })}
            type="text"
            placeholder="Receiver Name"
            className="input input-bordered w-full"
          />
          <input
            {...register("receiverPhone", { required: true })}
            type="text"
            placeholder="Receiver Phone"
            className="input input-bordered w-full"
          />
          <select
            {...register("receiverDistrict", { required: true })}
            className="select select-bordered w-full"
            defaultValue=""
            onChange={(e) => setReceiverDistrict(e.target.value)}
          >
            <option disabled value="">
              Select Receiver District
            </option>
            {districts.map((district, i) => (
              <option key={i} value={district}>
                {district}
              </option>
            ))}
          </select>
          <select
            {...register("receiverWarehouse", { required: true })}
            className="select select-bordered w-full"
            disabled={!receiverDistrict}
            defaultValue=""
          >
            <option disabled value="">
              {receiverDistrict
                ? "Select Delivery Area"
                : "Select District First"}
            </option>
            {receiverAreas.map((area, i) => (
              <option key={i} value={area}>
                {area}
              </option>
            ))}
          </select>
          <textarea
            {...register("deliveryAddress", { required: true })}
            placeholder="Delivery Address"
            className="textarea textarea-bordered w-full"
            rows={3}
          ></textarea>
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <input
            {...register("parcelWeight", { required: true })}
            type="number"
            step="0.1"
            placeholder="Parcel Weight (e.g. 1.5)"
            className="input input-bordered w-full sm:max-w-xs"
            onChange={(e) => setWeight(e.target.value)}
          />
          <button type="submit" className="btn btn-primary px-8">
            Continue
          </button>
        </div>
      </form>

      {/* Real-time cost breakdown */}
      {showBreakdown && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Delivery Cost Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold">Parcel Type:</p>
              <p>{breakdownData.breakdown.parcelType}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold">Weight:</p>
              <p>{breakdownData.breakdown.weight}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold">Delivery Zone:</p>
              <p>{breakdownData.breakdown.deliveryZone}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold">Base Cost:</p>
              <p>{breakdownData.breakdown.baseCost}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold">Extra Charges:</p>
              <p>{breakdownData.breakdown.extraCharges}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold text-green-700">Total Cost:</p>
              <p className="text-lg font-bold text-green-600">
                ৳{breakdownData.total}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddParcel;
