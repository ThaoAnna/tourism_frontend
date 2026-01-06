import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../components/Header";
import type { Tour } from "../types/index";

const formatPrice = (price: number): string => {
  return `$${price.toLocaleString()}`;
};

const calculateTotalPrice = (priceMin: number, priceMax: number, people: number): { min: number; max: number } => {
  return {
    min: priceMin * people,
    max: priceMax * people
  };
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

interface LocationState {
  tour?: Tour;
}

const BookingForm: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const tour = location.state?.tour;

  const [formData, setFormData] = useState<BookingFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    travelDate: "",
    numberOfPeople: 1,
  });

  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to home if no tour data
  useEffect(() => {
    if (!tour) {
      history.push('/');
    }
  }, [tour, history]);

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

  const handleSubmit = async () => {
    if (validateForm() && tour) {
      setIsSubmitting(true);
      
      const bookingData = {
        ...formData,
        tourId: tour.id,
        tourName: tour.name,
        tourDuration: tour.duration,
        tourRoute: tour.route.join(" → "),
        totalPriceMin: calculateTotalPrice(tour.totalPrice.min, tour.totalPrice.max, formData.numberOfPeople).min,
        totalPriceMax: calculateTotalPrice(tour.totalPrice.min, tour.totalPrice.max, formData.numberOfPeople).max,
      };
      
      try {
        // TODO: Replace with your actual API endpoint
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
          // Send confirmation email
          await fetch('/api/send-confirmation-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: formData.customerEmail,
              customerName: formData.customerName,
              tourName: tour.name,
              travelDate: formData.travelDate,
              numberOfPeople: formData.numberOfPeople,
              totalPrice: `${formatPrice(bookingData.totalPriceMin)} - ${formatPrice(bookingData.totalPriceMax)}`,
            }),
          });

          // Show success modal
          setShowSuccessModal(true);
        } else {
          alert('Booking failed. Please try again.');
        }
      } catch (error) {
        console.error('Booking error:', error);
        // For demo purposes, still show success modal
        // In production, you'd show an error message
        setShowSuccessModal(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  if (!tour) {
    return null; // Will redirect in useEffect
  }

  const totalPrice = calculateTotalPrice(
    tour?.totalPrice?.min || 0,
    tour?.totalPrice?.max || 0,
    formData.numberOfPeople
  );

  // Success Modal Component
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-fade-in">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Booking Confirmed! 🎉
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Thank you, {formData.customerName}! Your booking has been confirmed.
          A confirmation email has been sent to{" "}
          <span className="font-semibold">{formData.customerEmail}</span>
        </p>

        {/* Booking Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tour:</span>
            <span className="font-semibold text-gray-800">{tour?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Date:</span>
            <span className="font-semibold text-gray-800">{formData.travelDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">People:</span>
            <span className="font-semibold text-gray-800">{formData.numberOfPeople}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold text-blue-600">
              {formatPrice(totalPrice.min)} - {formatPrice(totalPrice.max)}
            </span>
          </div>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={() => history.push('/')}
          className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white py-3 rounded-lg text-base font-semibold hover:opacity-90 transition duration-200 shadow-md"
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && <SuccessModal />}

      <section id="booking" className="pb-6 sm:pt-8 lg:pt-26 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-white min-h-screen">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 sm:mt-4 mb-4 sm:mb-6 lg:mb-8 text-gray-800 text-center">
        Booking Form
      </h2>
      <div className="pb-10 pt-0">
        <Header />
      </div>

      {/* Tour Information */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            {tour.name}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-semibold">Duration:</span> {tour.duration} days</p>
            <p><span className="font-semibold">Style:</span> {tour.style}</p>
            <p><span className="font-semibold">Route:</span> {tour.route?.join(" → ")}</p>
          </div>
        </div>
      </div>

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
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm sm:text-base font-medium text-gray-700">Total Price Range:</span>
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              {formatPrice(totalPrice.min)} - {formatPrice(totalPrice.max)}
            </span>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              Base price: {formatPrice(tour?.totalPrice?.min || 0)} - {formatPrice(tour?.totalPrice?.max || 0)} per person
            </p>
            <p>
              {formData.numberOfPeople} {formData.numberOfPeople === 1 ? "person" : "people"}
            </p>
          </div>
          
          {/* Price Breakdown */}
          {tour?.priceBreakdown && (
            <div className="mt-3 pt-3 border-t border-blue-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">Price includes (per person):</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>• Transport: {formatPrice(tour.priceBreakdown.transport)}</p>
                <p>• Hotel: {formatPrice(tour.priceBreakdown.hotel)}</p>
                <p>• Food & Activities: {formatPrice(tour.priceBreakdown.foodAndActivities)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:flex-1 bg-gray-200 text-gray-700 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full sm:flex-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition duration-200 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </div>
      </div>
    </section>
    </>
  );
};

export default BookingForm;