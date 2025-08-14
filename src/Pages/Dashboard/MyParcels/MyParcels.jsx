import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleView = (id) => {
    console.log("View details of:", id);
    
  };

  const handlePay = (id) => {
    console.log("Pay for parcel:", id);
    navigate(`/dashboard/payment/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${id}`);
          if (res.data.success) {
            Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
            refetch();
          } else {
            Swal.fire("Error!", res.data.message || "Failed to delete.", "error");
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return <div className="text-center my-10">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        My Parcels: {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.tracking_id}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.parcelType === "Document"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {parcel.parcelType}
                  </span>
                </td>
                <td>৳ {parcel.cost}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td>{format(new Date(parcel.creation_date), "yyyy-MM-dd")}</td>
                <td className="flex flex-wrap gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleView(parcel._id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handlePay(parcel._id)}
                    disabled={parcel.payment_status === "paid"}
                  >
                    Pay
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
