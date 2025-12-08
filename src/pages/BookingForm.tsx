import React, { useState } from "react";

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

const calculateTotalPrice = (pricePerPerson: number, people: number): number => {
  return pricePerPerson * people;
};

const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const IconUser = () => (
  <svg
    className="w-4 h-4 inline mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg
    className="w-4 h-4 inline mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M4 4h16v16H4z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPhone = () => (
  <svg
    className="w-4 h-4 inline mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75l1.1 4.4a1 1 0 0 1-.27.94l-2.2 2.2a16 16 0 0 0 6.9 6.9l2.2-2.2a1 1 0 0 1 .94-.27l4.4 1.1a1 1 0 0 1 .75 1z" />
  </svg>
);

const IconCalendar = () => (
  <svg
    className="w-4 h-4 inline mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconUsers = () => (
  <svg
    className="w-4 h-4 inline mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M9 21v-2a4 4 0 0 1 3-3.87" />
    <circle cx="9" cy="7" r="4" />
    <circle cx="17" cy="7" r="4" />
  </svg>
);

interface Destination {
  id: string | number;
  name?: string;
  price: number;
}

interface BookingFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  travelDate: string;
  numberOfPeople: number;
}

interface BookingFormErrors {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  travelDate?: string;
  numberOfPeople?: string;
}

interface BookingFormProps {
  destination: Destination;
  onSubmit: (data: BookingFormData & { destinationId: string | number }) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  destination,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    travelDate: "",
    numberOfPeople: 1,
  });

  const [errors, setErrors] = useState<BookingFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: BookingFormErrors = {};

    if (!formData.customerName.trim()) newErrors.customerName = "Name is required";
    if (!formData.customerEmail.trim())
      newErrors.customerEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.customerEmail))
      newErrors.customerEmail = "Email is invalid";
    if (!formData.customerPhone.trim()) newErrors.customerPhone = "Phone is required";
    if (!formData.travelDate) newErrors.travelDate = "Travel date is required";
    if (formData.numberOfPeople < 1)
      newErrors.numberOfPeople = "At least 1 person required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ ...formData, destinationId: destination.id });
    }
  };

  const totalPrice = calculateTotalPrice(destination.price, formData.numberOfPeople);

  return (
    <section id="booking" className="pt-6 sm:pt-8 lg:pt-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-white min-h-screen">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 sm:mt-4 mb-4 sm:mb-6 lg:mb-8 text-gray-800 text-center">
        Booking Form
      </h2>
      
      {destination.name && (
        <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 text-center">
          {destination.name}
        </p>
      )}

      <div className="rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg bg-gray-100 p-4 sm:p-6 lg:p-8">
        {/* Full Name */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1">
            <IconUser /> Full Name *
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => handleChange("customerName", e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
              errors.customerName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
          {errors.customerName && (
            <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            <IconMail /> Email *
          </label>
          <input
            type="email"
            value={formData.customerEmail}
            onChange={(e) => handleChange("customerEmail", e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
              errors.customerEmail ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="john@example.com"
          />
          {errors.customerEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            <IconPhone /> Phone *
          </label>
          <input
            type="tel"
            value={formData.customerPhone}
            onChange={(e) => handleChange("customerPhone", e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
              errors.customerPhone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+1 234 567 8900"
          />
          {errors.customerPhone && (
            <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>
          )}
        </div>

        {/* Travel Date */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            <IconCalendar /> Travel Date *
          </label>
          <input
            type="date"
            value={formData.travelDate}
            onChange={(e) => handleChange("travelDate", e.target.value)}
            min={getTodayDate()}
            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
              errors.travelDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.travelDate && (
            <p className="text-red-500 text-xs mt-1">{errors.travelDate}</p>
          )}
        </div>

        {/* Number of People */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            <IconUsers /> Number of People *
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={formData.numberOfPeople}
            onChange={(e) =>
              handleChange("numberOfPeople", parseInt(e.target.value) || 1)
            }
            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
              errors.numberOfPeople ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.numberOfPeople && (
            <p className="text-red-500 text-xs mt-1">{errors.numberOfPeople}</p>
          )}
        </div>

        {/* Total Price */}
        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base font-medium text-gray-700">Total Price:</span>
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {formatPrice(destination.price)} × {formData.numberOfPeople}{" "}
            {formData.numberOfPeople === 1 ? "person" : "people"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:flex-1 bg-gray-200 text-gray-700 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:flex-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:opacity-90 transition duration-200"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;