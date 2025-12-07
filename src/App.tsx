// App.tsx
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";
import BookingForm from "./pages/BookingForm";
import Header from "./components/Header";

export default function App() {
  // Example destination (you can replace with dynamic data later)
  const destination = { id: 1, price: 199 };

  return (
    <BrowserRouter>
      <Header />
      <div className="pt-20" /> {/* spacing below fixed header */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={RegisterForm} />
        <Route
          path="/booking"
          render={(routeProps) => (
            <BookingForm
              {...routeProps} // gives history, location, match if you ever need them
              destination={destination}
              onSubmit={(data) => {
                console.log("Booking submitted:", data);
                routeProps.history.push("/"); // navigate home after submit
              }}
              onCancel={() => routeProps.history.goBack()} // go back on cancel
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}
