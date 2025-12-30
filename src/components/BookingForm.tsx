import React, { useState } from "react";
import { User, Mail, Phone, Calendar, Users } from "lucide-react";
import type { Tour, BookingRequest, FormErrors } from "../types/index";
import {
  formatPrice,
  calculateTotalPrice,
  getTodayDate,
} from "../utils/helpers";

interface BookingFormProps {
  tour: Tour;
  onSubmit: (data: BookingRequest) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  tour,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<BookingRequest, "tourId">>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    travelDate: "",
    numberOfPeople: 1,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Email is invalid";
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone is required";
    }

    if (!formData.travelDate) {
      newErrors.travelDate = "Travel date is required";
    }

    if (formData.numberOfPeople < 1) {
      newErrors.numberOfPeople = "At least 1 person required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        tourId: tour.id,
      });
    }
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const totalPrice = tour.totalPrice.min * formData.numberOfPeople;

  return (
    <div className="space-y-4">
      {/* Tour Summary */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="font-bold text-lg mb-2">{tour.name}</h3>
        <p className="text-sm text-gray-600">
          {tour.duration} days • {tour.route.join(" → ")}
        </p>
        <p className="text-blue-600 font-bold mt-2">
          {formatPrice(tour.totalPrice.min)} per person
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <User className="w-4 h-4 inline mr-1" />
          Full Name *
        </label>
        <input
          type="text"
          value={formData.customerName}
          onChange={(e) => handleChange("customerName", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
            errors.customerName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="John Doe"
        />
        {errors.customerName && (
          <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Mail className="w-4 h-4 inline mr-1" />
          Email *
        </label>
        <input
          type="email"
          value={formData.customerEmail}
          onChange={(e) => handleChange("customerEmail", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
            errors.customerEmail ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="john@example.com"
        />
        {errors.customerEmail && (
          <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Phone className="w-4 h-4 inline mr-1" />
          Phone *
        </label>
        <input
          type="tel"
          value={formData.customerPhone}
          onChange={(e) => handleChange("customerPhone", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
            errors.customerPhone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="+1 234 567 8900"
        />
        {errors.customerPhone && (
          <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Calendar className="w-4 h-4 inline mr-1" />
          Travel Date *
        </label>
        <input
          type="date"
          value={formData.travelDate}
          onChange={(e) => handleChange("travelDate", e.target.value)}
          min={getTodayDate()}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
            errors.travelDate ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.travelDate && (
          <p className="text-red-500 text-xs mt-1">{errors.travelDate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Users className="w-4 h-4 inline mr-1" />
          Number of People *
        </label>
        <input
          type="number"
          min="1"
          max="10"
          value={formData.numberOfPeople}
          onChange={(e) =>
            handleChange("numberOfPeople", parseInt(e.target.value) || 1)
          }
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
            errors.numberOfPeople ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.numberOfPeople && (
          <p className="text-red-500 text-xs mt-1">{errors.numberOfPeople}</p>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Total Price:</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {formatPrice(tour.totalPrice.min)} × {formData.numberOfPeople}{" "}
          {formData.numberOfPeople === 1 ? "person" : "people"}
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
