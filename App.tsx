
import { useState, type FormEvent } from "react";

type Page =
  | "Home"
  | "Overview"
  | "About Us"
  | "Mission"
  | "Activities"
  | "Catalogue"
  | "Fees & Booking"
  | "Contact";

type Activity = {
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
  image: string;
};

const activities: Activity[] = [
  {
    name: "Mountain Hiking",
    category: "Hiking",
    price: 85,
    duration: "3–4 hours",
    description: "Explore beautiful trails and enjoy the outdoors.",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "River Rapids Adventure",
    category: "Water Adventures",
    price: 120,
    duration: "2–3 hours",
    description: "Experience an exciting water-based outdoor adventure.",
    image:
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Forest Camping",
    category: "Camping",
    price: 150,
    duration: "Overnight",
    description: "Enjoy an outdoor camping experience with friends.",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mountain Cycling",
    category: "Cycling",
    price: 100,
    duration: "2 hours",
    description: "Explore outdoor trails by bicycle.",
    image:
      "https://images.unsplash.com/photo-1544191696-15693072aee7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Nature Discovery Walk",
    category: "Nature",
    price: 75,
    duration: "2 hours",
    description: "Discover nature and learn about environmental conservation.",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rock Climbing",
    category: "Climbing",
    price: 130,
    duration: "2–3 hours",
    description: "Challenge yourself with a climbing adventure.",
    image:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80",
  },
];

const pages: Page[] = [
  "Home",
  "Overview",
  "About Us",
  "Mission",
  "Activities",
  "Catalogue",
  "Fees & Booking",
  "Contact",
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  border: "1px solid #ccd4cc",
  borderRadius: 6,
  marginTop: 6,
  marginBottom: 16,
  fontSize: 15,
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  background: "#ff9f43",
  color: "#222",
  border: 0,
  borderRadius: 6,
  padding: "12px 20px",
  fontWeight: "bold",
  cursor: "pointer",
  margin: "5px",
};

function App() {
  const [page, setPage] = useState<Page>("Home");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [activityName, setActivityName] = useState("Mountain Hiking");
  const [groupSize, setGroupSize] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [gear, setGear] = useState(false);
  const [lunch, setLunch] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  function navigate(nextPage: Page) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const selectedActivity =
    activities.find((a) => a.name === activityName) ?? activities[0]!;

  const activityCost = selectedActivity.price * groupSize;
  const gearCost = gear ? 25 * groupSize : 0;
  const lunchCost = lunch ? 12 * groupSize : 0;
  const discount = groupSize >= 5 ? activityCost * 0.05 : 0;
  const total = activityCost + gearCost + lunchCost - discount;

  const filteredActivities = activities.filter((activity) => {
    const text = (
      activity.name +
      " " +
      activity.category +
      " " +
      activity.description
    ).toLowerCase();

    return (
      text.includes(search.toLowerCase()) &&
      (category === "All" || activity.category === category)
    );
  });

  function chooseActivity(activity: Activity) {
    setActivityName(activity.name);
    navigate("Fees & Booking");
  }

  function enquireAboutBooking() {
    setSubject("Booking enquiry");
    setMessage(
      `I would like to enquire about ${activityName}.\n` +
        `Participants: ${groupSize}\n` +
        `Preferred date: ${bookingDate || "Not selected"}\n` +
        `Estimated cost: ${money(total)}\n` +
        "Please confirm availability and final pricing.",
    );
    navigate("Contact");
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    // Replace this with your real organisation email address.
    const recipient = "YOUR_EMAIL@example.com";

    if (recipient === "YOUR_EMAIL@example.com") {
      setFeedback(
        "The form is working. Replace YOUR_EMAIL@example.com in App.tsx with your real email address to prepare an email.",
      );
      return;
    }

    const mailSubject = encodeURIComponent(
      `Adventure Escape SA: ${subject}`,
    );

    const mailBody = encodeURIComponent(
      `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || "Not provided"}\n\n` +
        `Message:\n${message}`,
    );

    window.location.href =
      `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;

    setFeedback(
      "Your email application should open with your enquiry. Review and send the email there.",
    );
  }

  return (
    <div className="app">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f5f7f2;
          color: #333;
          line-height: 1.6;
        }

        button, input, select, textarea {
          font: inherit;
        }

        .header {
          background: #174d32;
          color: white;
          padding: 16px 5%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .logo {
          font-size: 23px;
          font-weight: bold;
        }

        .logo span {
          color: #ff9f43;
        }

        .nav {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .nav button {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px 9px;
          border-radius: 5px;
          font-size: 13px;
        }

        .nav button:hover,
        .nav button.active {
          color: #ffb15c;
          background: rgba(255,255,255,.08);
        }

        .hero {
          min-height: 350px;
          padding: 65px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          background:
            linear-gradient(rgba(0,0,0,.60), rgba(0,0,0,.60)),
            url("https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1600&q=80")
            center/cover no-repeat;
        }

        .hero h1 {
          font-size: clamp(30px, 5vw, 48px);
          line-height: 1.2;
          margin-bottom: 15px;
        }

        .hero p {
          max-width: 750px;
          margin: 0 auto 22px;
          font-size: 18px;
        }

        .small-hero {
          min-height: 230px;
        }

        .container {
          max-width: 1150px;
          width: 92%;
          margin: auto;
          padding: 45px 0;
        }

        .title {
          color: #174d32;
          text-align: center;
          font-size: 30px;
          margin: 0 0 12px;
        }

        .intro {
          max-width: 780px;
          margin: 0 auto 28px;
          text-align: center;
          color: #566158;
        }

        .center {
          text-align: center;
        }

        .green-section {
          background: #e7efe6;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          margin-top: 28px;
        }

        .card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(0,0,0,.08);
        }

        .card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .card-content {
          padding: 22px;
        }

        .card h3 {
          color: #174d32;
          margin: 8px 0;
        }

        .card p {
          color: #535d55;
        }

        .icon {
          font-size: 36px;
        }

        .tag {
          background: #e7efe6;
          color: #174d32;
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 12px;
        }

        .price {
          color: #174d32;
          font-weight: bold;
          font-size: 22px;
          margin: 12px 0;
        }

        .button {
          ${""}
          background: #ff9f43;
          color: #222;
          border: 0;
          border-radius: 6px;
          padding: 12px 20px;
          font-weight: bold;
          cursor: pointer;
          margin: 5px;
        }

        .button:hover {
          background: #f28b22;
        }

        .button-green {
          background: #174d32;
          color: white;
        }

        .button-green:hover {
          background: #103923;
        }

        .panel {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 4px 14px rgba(0,0,0,.07);
        }

        .panel h2 {
          color: #174d32;
          margin-top: 0;
        }

        .two-columns {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 25px;
          align-items: start;
        }

        .filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin: 25px 0;
        }

        .filters input {
          flex: 1;
          min-width: 220px;
          max-width: 400px;
        }

        .filters select {
          min-width: 190px;
        }

        .field {
          margin-bottom: 17px;
        }

        .field label {
          display: block;
          font-weight: bold;
          margin-bottom: 6px;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          border: 1px solid #cbd3ca;
          border-radius: 6px;
          padding: 12px;
          background: white;
        }

        .field textarea {
          min-height: 130px;
          resize: vertical;
        }

        .check {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 14px 0;
        }

        .check input {
          width: auto;
        }

        .cost-row {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 9px 0;
          border-bottom: 1px solid #e4e8e3;
        }

        .total {
          margin-top: 20px;
          background: #174d32;
          color: white;
          border-radius: 8px;
          padding: 20px;
        }

        .total strong {
          display: block;
          color: #ffb15c;
          font-size: 30px;
          margin-top: 5px;
        }

        .contact-info {
          background: #174d32;
          color: white;
          border-radius: 10px;
          padding: 25px;
        }

        .contact-info h2,
        .contact-info h3 {
          color: #ffb15c;
        }

        .contact-info a {
          color: white;
        }

        .contact-item {
          margin-top: 22px;
        }

        .feedback {
          margin-top: 15px;
          padding: 12px;
          background: #e7efe6;
          color: #174d32;
          border-radius: 6px;
          overflow-wrap: anywhere;
        }

        .steps {
          max-width: 800px;
          margin: 25px auto 0;
        }

        .step {
          display: flex;
          gap: 16px;
          padding: 18px;
          margin-bottom: 12px;
          background: white;
          border-radius: 8px;
        }

        .step-number {
          background: #174d32;
          color: white;
          height: 38px;
          min-width: 38px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-weight: bold;
        }

        .step h3 {
          color: #174d32;
          margin: 0 0 5px;
        }

        .muted {
          color: #687168;
          font-size: 14px;
        }

        .footer {
          background: #123c28;
          color: white;
          padding: 25px 15px;
          text-align: center;
          margin-top: 15px;
        }

        .footer-nav {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 10px;
        }

        .footer-nav button {
          color: #ffb15c;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 850px) {
          .header {
            justify-content: center;
          }

          .nav {
            justify-content: center;
          }

          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .grid,
          .two-columns {
            grid-template-columns: 1fr;
          }

          .hero p {
            font-size: 16px;
          }

          .title {
            font-size: 26px;
          }

          .nav {
            gap: 1px;
          }

          .nav button {
            padding: 7px;
          }

          .container {
            padding: 32px 0;
          }
        }
      `}</style>

      {/* Navigation */}
      <header className="header">
        <div className="logo">
          Adventure <span>Escape SA</span>
        </div>

        <nav className="nav" aria-label="Main navigation">
          {pages.map((item) => (
            <button
              key={item}
              type="button"
              className={page === item ? "active" : ""}
              onClick={() => navigate(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {/* HOME */}
        {page === "Home" && (
          <>
            <section className="hero">
              <div>
                <h1>Explore Nature. Embrace Adventure.</h1>
                <p>
                  Discover exciting outdoor activities and unforgettable
                  experiences with Adventure Escape SA.
                </p>
                <button
                  className="button"
                  onClick={() => navigate("Activities")}
                >
                  Explore Activities
                </button>
                <button
                  className="button button-green"
                  onClick={() => navigate("Fees & Booking")}
                >
                  Plan Your Adventure
                </button>
              </div>
            </section>

            <section className="container">
              <h2 className="title">Welcome to Adventure Escape SA</h2>
              <p className="intro">
                Discover outdoor experiences, learn about our organisation
                and estimate the cost of your next adventure.
              </p>

              <div className="grid">
                <div className="card">
                  <div className="card-content">
                    <div className="icon">🏞️</div>
                    <h3>Outdoor Activities</h3>
                    <p>Explore hiking, cycling, camping and more.</p>
                    <button className="button" onClick={() => navigate("Activities")}>
                      View Activities
                    </button>
                  </div>
                </div>

                <div className="card">
                  <div className="card-content">
                    <div className="icon">🌿</div>
                    <h3>About Us</h3>
                    <p>Learn about our values and commitment to nature.</p>
                    <button className="button" onClick={() => navigate("About Us")}>
                      Learn More
                    </button>
                  </div>
                </div>

                <div className="card">
                  <div className="card-content">
                    <div className="icon">💰</div>
                    <h3>Fees & Booking</h3>
                    <p>Calculate an example cost for your group.</p>
                    <button className="button" onClick={() => navigate("Fees & Booking")}>
                      Check Fees
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* OVERVIEW */}
        {page === "Overview" && (
          <>
            <Hero title="Website Overview" />
            <section className="container">
              <h2 className="title">What Our Website Offers</h2>
              <p className="intro">
                Adventure Escape SA helps visitors discover activities,
                review example prices and prepare enquiries.
              </p>
              <div className="grid">
                {[
                  ["🏕️", "Activities", "Browse activity details and example prices."],
                  ["🌍", "About Us", "Read about our organisation and values."],
                  ["🧮", "Cost Calculator", "Calculate estimated costs for a group."],
                  ["✉️", "Contact", "Prepare an enquiry about an adventure."],
                ].map(([icon, title, description]) => (
                  <div className="card" key={title}>
                    <div className="card-content">
                      <div className="icon">{icon}</div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="title" style={{ marginTop: 45 }}>
                How It Works
              </h2>
              <div className="steps">
                {[
                  ["Explore", "Browse the available activities."],
                  ["Estimate", "Calculate your group's example costs."],
                  ["Enquire", "Prepare a message about your preferred activity."],
                  ["Confirm", "Ask the organisation to confirm availability."],
                ].map(([title, description], index) => (
                  <div className="step" key={title}>
                    <div className="step-number">{index + 1}</div>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ABOUT US */}
        {page === "About Us" && (
          <>
            <Hero title="About Adventure Escape SA" />
            <section className="container">
              <div className="two-columns">
                <div>
                  <h2 className="title" style={{ textAlign: "left" }}>
                    Who We Are
                  </h2>
                  <p>
                    Adventure Escape SA is an outdoor adventure tourism
                    concept designed for people who want to explore nature
                    and enjoy exciting outdoor activities.
                  </p>
                  <br />
                  <p>
                    Our website introduces adventure ideas, provides example
                    prices and allows visitors to prepare enquiries.
                  </p>
                  <br />
                  <p>
                    We encourage responsible outdoor recreation, preparation,
                    teamwork and respect for the natural environment.
                  </p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=80"
                  alt="Hikers exploring a scenic trail"
                  style={{ width: "100%", borderRadius: 10 }}
                />
              </div>

              <h2 className="title" style={{ marginTop: 45 }}>
                Our Values
              </h2>
              <div className="grid">
                <InfoCard icon="🛡️" title="Safety">
                  Encourage preparation, suitable equipment and safety guidance.
                </InfoCard>
                <InfoCard icon="🌍" title="Responsibility">
                  Respect nature and encourage responsible outdoor behaviour.
                </InfoCard>
                <InfoCard icon="🤝" title="Teamwork">
                  Promote cooperation and enjoyable shared experiences.
                </InfoCard>
              </div>
            </section>
          </>
        )}

        {/* MISSION */}
        {page === "Mission" && (
          <>
            <Hero title="Our Mission and Vision" />
            <section className="container">
              <p className="intro">
                We aim to encourage outdoor exploration, responsible tourism
                and memorable experiences.
              </p>
              <div className="grid">
                <InfoCard icon="🎯" title="Our Mission">
                  To introduce people to enjoyable and accessible outdoor
                  adventures while encouraging responsible exploration.
                </InfoCard>
                <InfoCard icon="🌄" title="Our Vision">
                  To become a trusted choice for people seeking outdoor
                  adventure experiences in South Africa.
                </InfoCard>
                <InfoCard icon="💚" title="Our Commitment">
                  To promote safety, teamwork, customer satisfaction and
                  respect for nature.
                </InfoCard>
              </div>
            </section>
          </>
        )}

        {/* ACTIVITIES */}
        {page === "Activities" && (
          <section className="container">
            <h1 className="title">Our Adventure Activities</h1>
            <p className="intro">
              Search for an activity or filter the list by category.
            </p>

            <div className="filters">
              <input
                type="search"
                aria-label="Search activities"
                placeholder="Search activities..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <select
                aria-label="Filter by category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="All">All Categories</option>
                {[...new Set(activities.map((a) => a.category))].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <ActivityGrid
              items={filteredActivities}
              onChoose={chooseActivity}
            />

            {filteredActivities.length === 0 && (
              <p className="panel center">
                No activities found. Try another search.
              </p>
            )}
          </section>
        )}

        {/* CATALOGUE */}
        {page === "Catalogue" && (
          <section className="container">
            <h1 className="title">Adventure Catalogue</h1>
            <p className="intro">
              Browse our sample catalogue and choose an activity to
              estimate its cost.
            </p>
            <ActivityGrid items={activities} onChoose={chooseActivity} />
          </section>
        )}

        {/* FEES */}
        {page === "Fees & Booking" && (
          <section className="container">
            <h1 className="title">Fees & Booking</h1>
            <p className="intro">
              Use this calculator to estimate your group's activity costs.
            </p>

            <div className="two-columns">
              <div className="panel">
                <h2>Calculate Your Estimate</h2>

                <div className="field">
                  <label htmlFor="activity">Choose an activity</label>
                  <select
                    id="activity"
                    style={inputStyle}
                    value={activityName}
                    onChange={(event) => setActivityName(event.target.value)}
                  >
                    {activities.map((activity) => (
                      <option key={activity.name} value={activity.name}>
                        {activity.name} — {money(activity.price)} per person
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="groupSize">Number of participants (1–20)</label>
                  <input
                    id="groupSize"
                    type="number"
                    style={inputStyle}
                    min={1}
                    max={20}
                    value={groupSize}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      if (value >= 1 && value <= 20) {
                        setGroupSize(Math.floor(value));
                      }
                    }}
                  />
                </div>

                <div className="field">
                  <label htmlFor="bookingDate">Preferred date</label>
                  <input
                    id="bookingDate"
                    type="date"
                    style={inputStyle}
                    min={new Date().toISOString().slice(0, 10)}
                    value={bookingDate}
                    onChange={(event) => setBookingDate(event.target.value)}
                  />
                </div>

                <label className="check">
                  <input
                    type="checkbox"
                    checked={gear}
                    onChange={(event) => setGear(event.target.checked)}
                  />
                  Include equipment rental (+R25 per person)
                </label>

                <label className="check">
                  <input
                    type="checkbox"
                    checked={lunch}
                    onChange={(event) => setLunch(event.target.checked)}
                  />
                  Include lunch (+R12 per person)
                </label>

                <p className="muted">
                  A sample 5% activity discount applies to groups of five
                  or more. All prices are examples.
                </p>
              </div>

              <div className="panel">
                <h2>Your Cost Estimate</h2>
                <p>{selectedActivity.name}</p>
                <p className="muted">
                  {money(selectedActivity.price)} per person
                </p>

                <div className="cost-row">
                  <span>Activity fees</span>
                  <strong>{money(activityCost)}</strong>
                </div>
                <div className="cost-row">
                  <span>Equipment</span>
                  <strong>{money(gearCost)}</strong>
                </div>
                <div className="cost-row">
                  <span>Lunch</span>
                  <strong>{money(lunchCost)}</strong>
                </div>
                <div className="cost-row">
                  <span>Group discount</span>
                  <strong>−{money(discount)}</strong>
                </div>

                <div className="total">
                  <div>Estimated Total</div>
                  <strong>{money(total)}</strong>
                  <p>
                    {groupSize} participant{groupSize === 1 ? "" : "s"}
                  </p>
                </div>

                <button
                  className="button"
                  style={{ width: "100%", margin: "20px 0 0" }}
                  onClick={enquireAboutBooking}
                >
                  Enquire About Booking
                </button>

                <p className="muted" style={{ marginTop: 12 }}>
                  This is an estimate, not a confirmed booking.
                  Final prices and availability must be confirmed.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT */}
        {page === "Contact" && (
          <section className="container">
            <h1 className="title">Contact Us</h1>
            <p className="intro">
              Send an enquiry about an activity, pricing or booking.
            </p>

            <div className="two-columns">
              <div className="contact-info">
                <h2>Get in Touch</h2>
                <p>
                  Contact Adventure Escape SA to enquire about our
                  example activities and arrangements.
                </p>

                <div className="contact-item">
                  <h3>📍 Location</h3>
                  <p>South Africa</p>
                </div>

                <div className="contact-item">
                  <h3>📧 Email</h3>
                  <p>Replace the example email address in the code with yours.</p>
                </div>

                <div className="contact-item">
                  <h3>🕒 Business Hours</h3>
                  <p>Add your confirmed opening hours here.</p>
                </div>
              </div>

              <form className="panel" onSubmit={submitContact}>
                <h2>Send an Enquiry</h2>

                <div className="field">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    style={inputStyle}
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    style={inputStyle}
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    style={inputStyle}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Your phone number"
                  />
                </div>

                <div className="field">
                  <label htmlFor="subject">Enquiry Type *</label>
                  <select
                    id="subject"
                    style={inputStyle}
                    required
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                  >
                    <option value="">Select an enquiry type</option>
                    <option value="General enquiry">General enquiry</option>
                    <option value="Activity enquiry">Activity enquiry</option>
                    <option value="Fees and pricing">Fees and pricing</option>
                    <option value="Booking enquiry">Booking enquiry</option>
                    <option value="Group booking">Group booking</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    style={inputStyle}
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write your message..."
                  />
                </div>

                <button className="button" type="submit">
                  Prepare Email
                </button>

                {feedback && (
                  <p className="feedback" role="status">
                    {feedback}
                  </p>
                )}

                <p className="muted">
                  The form prepares an email; it does not save enquiries
                  to a database.
                </p>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <strong>Adventure Escape SA</strong>
        <p>Explore Nature. Embrace Adventure. Create Memories.</p>
        <p>© 2026 Adventure Escape SA. All rights reserved.</p>

        <div className="footer-nav">
          {pages.map((item) => (
            <button key={item} onClick={() => navigate(item)}>
              {item}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}

/* Reusable hero banner */
function Hero({ title }: { title: string }) {
  return (
    <section className="hero small-hero">
      <h1>{title}</h1>
    </section>
  );
}

/* Reusable information card */
function InfoCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: string;
}) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

/* Reusable activity cards */
function ActivityGrid({
  items,
  onChoose,
}: {
  items: Activity[];
  onChoose: (activity: Activity) => void;
}) {
  return (
    <div className="grid">
      {items.map((activity) => (
        <article className="card" key={activity.name}>
          <img src={activity.image} alt={activity.name} loading="lazy" />

          <div className="card-content">
            <span className="tag">{activity.category}</span>
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
            <p className="muted">Duration: {activity.duration}</p>

            <div className="price">{money(activity.price)} / person</div>

            <button
              className="button"
              style={{ width: "100%" }}
              onClick={() => onChoose(activity)}
            >
              Calculate Fees
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default App;