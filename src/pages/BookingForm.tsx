import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  MapPin,
  Clock,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageShell from "../components/layout/PageShell";
import Container from "../components/layout/Container";
import type { Tour, BookingRequest } from "../types/index";
import { bookingService } from "../services/bookingService";
import { formatPrice, getTodayDate, calculateTotalPriceRange } from "../utils/helpers";

const fieldClass =
  "w-full min-h-11 px-4 py-2.5 text-sm text-ink bg-white border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald/25 focus:border-emerald transition-colors placeholder:text-muted/50";

const labelClass =
  "flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted mb-2";

const fieldErrorClass = "border-terracotta focus:ring-terracotta/25 focus:border-terracotta";

const embeddedSectionClass =
  "rounded-xl border border-navy/10 bg-white p-4 space-y-4";

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

interface BookingFormProps {
  tour?: Tour;
  onSubmit?: (bookingData: BookingRequest) => Promise<void>;
  onCancel?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  tour: tourProp,
  onSubmit,
  onCancel,
}) => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const tour = tourProp ?? location.state?.tour;
  const embedded = Boolean(tourProp);

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

  useEffect(() => {
    if (!embedded && !tour) {
      history.push("/");
    }
  }, [tour, embedded, history]);

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
    if (!validateForm() || !tour) return;

    setIsSubmitting(true);

    const bookingData: BookingRequest = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      tourId: tour.id,
      travelDate: formData.travelDate,
      numberOfPeople: formData.numberOfPeople,
    };

    try {
      if (onSubmit) {
        await onSubmit(bookingData);
      } else {
        await bookingService.create(bookingData);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      history.goBack();
    }
  };

  if (!tour) {
    return null;
  }

  const totalPrice = calculateTotalPriceRange(
    tour.totalPrice.min,
    tour.totalPrice.max,
    formData.numberOfPeople
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl shadow-navy/15 border border-navy/5 max-w-md w-full p-6 sm:p-8">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center ring-4 ring-emerald/10">
            <svg
              className="w-9 h-9 text-emerald"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center text-navy mb-2 tracking-tight">
          Booking Confirmed!
        </h3>
        <p className="text-center text-muted mb-6 leading-relaxed text-sm">
          Thank you, {formData.customerName}! Your booking has been confirmed.
          A confirmation email will be sent to{" "}
          <span className="font-semibold text-ink">{formData.customerEmail}</span>
        </p>

        <div className="bg-sand rounded-xl p-4 mb-6 space-y-2.5 border border-navy/5">
          <div className="flex justify-between text-sm gap-4">
            <span className="text-muted shrink-0">Tour</span>
            <span className="font-semibold text-ink text-right">{tour.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Date</span>
            <span className="font-semibold text-ink">{formData.travelDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">People</span>
            <span className="font-semibold text-ink">{formData.numberOfPeople}</span>
          </div>
          <div className="flex justify-between text-sm pt-2.5 border-t border-navy/10">
            <span className="text-muted">Total</span>
            <span className="font-bold text-emerald">
              {formatPrice(totalPrice.min)} – {formatPrice(totalPrice.max)}
            </span>
          </div>
        </div>

        <button
          onClick={() => history.push("/")}
          className="btn-primary w-full !min-h-11"
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );

  const tourSummaryCard = (
    <div className="bg-white rounded-2xl border border-navy/5 overflow-hidden shadow-md shadow-navy/5">
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <img
          src={tour.imageUrl}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block bg-gold text-navy text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
            {tour.style}
          </span>
          <h3 className="text-white font-bold text-lg leading-snug">{tour.name}</h3>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Clock className="w-4 h-4 text-emerald shrink-0" />
          <span>{tour.duration} days</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-muted">
          <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
          <span className="leading-snug">{tour.route.join(" → ")}</span>
        </div>
        <div className="pt-3 border-t border-navy/5">
          <p className="text-xs text-muted uppercase tracking-wide font-medium">From</p>
          <p className="text-2xl font-bold text-emerald mt-0.5">
            {formatPrice(tour.totalPrice.min)}
            <span className="text-sm font-normal text-muted"> / person</span>
          </p>
        </div>
      </div>
    </div>
  );

  const priceSummary = (compact = false) => (
    <div
      className={
        compact ? embeddedSectionClass : "bg-navy rounded-2xl p-5 text-white"
      }
    >
      <div className={compact ? "flex items-end justify-between gap-4" : ""}>
        <div className="w-full">
          {compact && (
            <p className="text-xs font-bold text-navy uppercase tracking-wide mb-3">
              Estimated total
            </p>
          )}
          {!compact && (
            <p className="text-xs uppercase tracking-wide text-white/60 font-medium mb-1">
              Estimated total
            </p>
          )}
          <p
            className={
              compact
                ? "text-xl font-bold text-emerald"
                : "text-2xl sm:text-3xl font-bold text-gold"
            }
          >
            {formatPrice(totalPrice.min)} – {formatPrice(totalPrice.max)}
          </p>
        </div>
        {!compact && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 text-sm text-white/70">
            <p>
              {formatPrice(tour.totalPrice.min)} – {formatPrice(tour.totalPrice.max)} per person
            </p>
            <p>
              {formData.numberOfPeople}{" "}
              {formData.numberOfPeople === 1 ? "traveler" : "travelers"}
            </p>
          </div>
        )}
      </div>

      {compact ? (
        <p className="text-xs text-muted mt-2">
          {formatPrice(tour.totalPrice.min)} – {formatPrice(tour.totalPrice.max)} per person ·{" "}
          {formData.numberOfPeople}{" "}
          {formData.numberOfPeople === 1 ? "traveler" : "travelers"}
        </p>
      ) : (
        tour.priceBreakdown && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs font-semibold text-white/80 mb-2 uppercase tracking-wide">
              Per person includes
            </p>
            <div className="text-xs text-white/60 space-y-1">
              <p>Transport: {formatPrice(tour.priceBreakdown.transport)}</p>
              <p>Hotel: {formatPrice(tour.priceBreakdown.hotel)}</p>
              <p>Food & Activities: {formatPrice(tour.priceBreakdown.foodAndActivities)}</p>
            </div>
          </div>
        )
      )}
    </div>
  );

  const renderField = (
    id: keyof BookingFormData,
    label: string,
    icon: React.ReactNode,
    input: React.ReactNode
  ) => (
    <div>
      <label htmlFor={id} className={labelClass}>
        {icon} {label}
      </label>
      {input}
      {errors[id] && (
        <p className="text-terracotta text-xs mt-1.5">{errors[id]}</p>
      )}
    </div>
  );

  const formFields = (compact = false) => (
    <div className={compact ? "space-y-4" : "space-y-8"}>
      <div className={compact ? embeddedSectionClass : ""}>
        {!compact && (
          <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-4 pb-2 border-b border-navy/5">
            Your details
          </h3>
        )}
        {compact && (
          <p className="text-xs font-bold text-navy uppercase tracking-wide">Your details</p>
        )}
        <div className={`grid grid-cols-1 ${compact ? "" : "sm:grid-cols-2"} gap-4`}>
          <div className={compact ? "" : "sm:col-span-2"}>
            {renderField(
              "customerName",
              "Full Name *",
              <User className="w-3.5 h-3.5 text-emerald" />,
              <input
                id="customerName"
                type="text"
                value={formData.customerName}
                onChange={(e) => handleChange("customerName", e.target.value)}
                className={`${fieldClass} ${errors.customerName ? fieldErrorClass : ""}`}
                placeholder="John Doe"
              />
            )}
          </div>

          {renderField(
            "customerEmail",
            "Email *",
            <Mail className="w-3.5 h-3.5 text-emerald" />,
            <input
              id="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => handleChange("customerEmail", e.target.value)}
              className={`${fieldClass} ${errors.customerEmail ? fieldErrorClass : ""}`}
              placeholder="john@example.com"
            />
          )}

          {renderField(
            "customerPhone",
            "Phone *",
            <Phone className="w-3.5 h-3.5 text-emerald" />,
            <input
              id="customerPhone"
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => handleChange("customerPhone", e.target.value)}
              className={`${fieldClass} ${errors.customerPhone ? fieldErrorClass : ""}`}
              placeholder="+1 234 567 8900"
            />
          )}
        </div>
      </div>

      <div className={compact ? embeddedSectionClass : ""}>
        {!compact && (
          <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-4 pb-2 border-b border-navy/5">
            Trip details
          </h3>
        )}
        {compact && (
          <p className="text-xs font-bold text-navy uppercase tracking-wide">Trip details</p>
        )}
        <div className={`grid grid-cols-1 ${compact ? "" : "sm:grid-cols-2"} gap-4`}>
          {renderField(
            "travelDate",
            "Travel Date *",
            <Calendar className="w-3.5 h-3.5 text-emerald" />,
            <input
              id="travelDate"
              type="date"
              value={formData.travelDate}
              onChange={(e) => handleChange("travelDate", e.target.value)}
              min={getTodayDate()}
              className={`${fieldClass} ${errors.travelDate ? fieldErrorClass : ""}`}
            />
          )}

          {renderField(
            "numberOfPeople",
            "Number of People *",
            <Users className="w-3.5 h-3.5 text-emerald" />,
            <input
              id="numberOfPeople"
              type="number"
              min={1}
              max={10}
              value={formData.numberOfPeople}
              onChange={(e) =>
                handleChange("numberOfPeople", parseInt(e.target.value) || 1)
              }
              className={`${fieldClass} ${errors.numberOfPeople ? fieldErrorClass : ""}`}
            />
          )}
        </div>
      </div>

      {priceSummary(compact)}

      <div className={compact ? embeddedSectionClass : ""}>
        <div className={`flex flex-col ${compact ? "" : "sm:flex-row"} gap-3`}>
          <button
            type="button"
            onClick={handleCancel}
            className={`btn-outline w-full ${compact ? "" : "sm:flex-1"} !min-h-12`}
          >
            {embedded ? "Cancel" : (
              <span className="inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`btn-emerald w-full ${compact ? "" : "sm:flex-1"} !min-h-12 !text-base ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </span>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="space-y-4">
        <div className={`${embeddedSectionClass} !space-y-3`}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-1.5 text-muted">
              <Clock className="w-4 h-4 text-emerald shrink-0" />
              {tour.duration} days
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted min-w-0">
              <MapPin className="w-4 h-4 text-terracotta shrink-0" />
              <span className="truncate">{tour.route.join(" · ")}</span>
            </span>
            <span className="text-xs font-semibold text-emerald bg-emerald/10 px-2.5 py-0.5 rounded-full">
              {tour.style}
            </span>
          </div>
        </div>
        {formFields(true)}
      </div>
    );
  }

  return (
    <>
      {showSuccessModal && <SuccessModal />}
      <PageShell>
        <Header />
        <main className="flex-1 section-spacing">
          <Container>
            <button
              onClick={() => history.goBack()}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-navy transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald mb-2">
                    Complete your booking
                  </p>
                  <h1 className="text-2xl md:text-3xl font-bold text-navy tracking-tight leading-tight">
                    Reserve your adventure
                  </h1>
                  <p className="text-muted mt-2 text-sm leading-relaxed">
                    Fill in your details below. You won&apos;t be charged until your booking is confirmed.
                  </p>
                </div>
                {tourSummaryCard}
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl border border-navy/5 shadow-md shadow-navy/5 p-6 sm:p-8">
                  {formFields()}
                </div>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </PageShell>
    </>
  );
};

export default BookingForm;
