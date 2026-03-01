import React, { useState, useMemo } from "react";

/* ================== DATA ================== */

// Durations for plan
const DURATIONS = [
  { label: "1 Month", weeks: 4 },
  { label: "3 Months", weeks: 12 },
  { label: "6 Months", weeks: 26 },
  { label: "1 Year", weeks: 52 },
];

const ACTIVITY_LEVELS = ["Light", "Moderate", "Intense"];

/* ----- Diet options for Veg / Non-veg users ----- */

// Veg only
const VEG_BREAKFAST = [
  "Oats with milk & banana",
  "Idli with sambar",
  "Vegetable upma",
  "Vegetable poha",
  "Dosa with coconut chutney",
  "Paneer stuffed paratha (less oil)",
  "Ragi dosa with chutney",
  "Fruit salad with nuts",
  "Moong dal chilla",
  "Curd rice with cucumber",
  "Sprouts salad",
  "Peanut butter toast",
  "Millet porridge with fruits",
  "Besan chilla with veggies",
  "Masala oats with veggies",
  "Ragi malt with nuts",
  "Stuffed methi paratha",
  "Vegetable sandwich (brown bread)",
  "Banana smoothie with seeds",
  "Vegetable sevai (vermicelli)",
  "Apple slices with peanut butter",
  "Idiyappam with vegetable stew",
  "Mixed dal dosa",
  "Wheat pancakes with honey",
  "Sabudana khichdi with curd",
  "Multigrain toast with hung curd",
];

const VEG_LUNCH = [
  "Brown rice, dal, salad",
  "Chapati, dal, mix veg sabzi, salad",
  "Lemon rice, curd, salad",
  "Vegetable pulao, raita",
  "Sambar rice, poriyal",
  "Curd rice, beetroot curry",
  "Millet khichdi, salad",
  "Chapati, chole, salad",
  "Veg biryani, raita",
  "Rajma rice, salad",
  "Stuffed paratha, curd, salad",
  "Dal khichdi, roasted papad",
  "Mixed veg curry, chapati",
  "Spinach dal, rice, salad",
  "Paneer bhurji, chapati, salad",
  "Soya chunks curry, rice",
  "Lentil soup, bread, salad",
  "Tomato rice, cucumber raita",
  "Veg fried rice (less oil), salad",
  "Kadhi rice, veg side dish",
  "Vegetable sambar, idli",
  "Veg stew, appam",
  "Chickpea salad, grilled veggies",
  "Sprouts pulao, salad",
  "Palak paneer, chapati, salad",
  "Vegetable korma, jeera rice",
];

const VEG_DINNER = [
  "Chapati with dal & sabzi",
  "Vegetable soup & toast",
  "Veg khichdi & curd",
  "Mixed veg curry & chapati",
  "Grilled paneer & salad",
  "Tomato soup & chapati",
  "Veg dosa & chutney",
  "Light lemon rice & curd",
  "Stuffed paratha & raita",
  "Spinach soup & sandwich",
  "Ragi balls & sambar",
  "Veg pulao & cucumber salad",
  "Idli & sambar",
  "Curd rice & beetroot curry",
  "Chapati & chole",
  "Dal tadka & rice (small)",
  "Vegetable stew & phulka",
  "Besan chilla & salad",
  "Paneer tikka & veg sticks",
  "Veg noodles (less oil)",
  "Oats khichdi with veggies",
  "Veg sandwich & soup",
  "Millet dosa & chutney",
  "Lentil salad & soup",
  "Stuffed capsicum & roti",
  "Veg cutlet & salad",
];

// Non-veg (mix of veg and non-veg)
const NONVEG_BREAKFAST = [
  "Boiled eggs & whole-wheat toast",
  "Cheese omelette with veggies",
  "Banana protein smoothie",
  "Egg bhurji with chapati",
  "Chicken sausage with sautéed veggies",
  "Scrambled eggs & milk",
  "Egg sandwich (brown bread)",
  "Oats with milk & banana",
  "Idli with sambar",
  "Vegetable upma",
  "Vegetable poha",
  "Paneer stuffed paratha (less oil)",
  "Ragi dosa with chutney",
  "Fruit salad with nuts",
  "Moong dal chilla",
  "Curd rice with cucumber",
  "Sprouts salad",
  "Peanut butter toast",
  "Millet porridge with fruits",
  "Besan chilla with veggies",
  "Masala oats with veggies",
  "Ragi malt with nuts",
  "Stuffed methi paratha",
  "Vegetable sandwich (brown bread)",
  "Apple slices with peanut butter",
  "Wheat pancakes with honey",
];

const NONVEG_LUNCH = [
  "Egg curry, chapati, salad",
  "Chicken curry, rice, salad",
  "Grilled chicken, brown rice, veggies",
  "Fish curry, rice, salad",
  "Chicken biryani, raita",
  "Egg fried rice (less oil), salad",
  "Chicken stew, appam",
  "Paneer bhurji, chapati, salad",
  "Soya chunks curry, rice",
  "Brown rice, dal, salad",
  "Chapati, dal, sabzi, salad",
  "Vegetable pulao, raita",
  "Rajma rice, salad",
  "Stuffed paratha, curd, salad",
  "Dal khichdi, roasted papad",
  "Spinach dal, rice, salad",
  "Lentil soup, bread, salad",
  "Tomato rice, cucumber raita",
  "Veg fried rice (less oil), salad",
  "Kadhi rice, veg side dish",
  "Vegetable sambar, idli",
  "Veg stew, appam",
  "Sprouts pulao, salad",
  "Chickpea salad, grilled veggies",
  "Palak chicken, chapati, salad",
  "Chicken tikka with brown rice",
];

const NONVEG_DINNER = [
  "Chapati, egg curry & salad",
  "Grilled chicken & salad",
  "Fish fry (shallow) & veg soup",
  "Chicken stew & chapati",
  "Chicken soup & toast",
  "Egg bhurji & chapati",
  "Ragi balls & chicken curry",
  "Curd rice & grilled fish",
  "Egg dosa & chutney",
  "Chicken pulao (small portion) & salad",
  "Chapati & chole",
  "Tomato soup & chapati",
  "Mixed veg curry & chapati",
  "Paneer tikka & veg sticks",
  "Veg noodles (less oil)",
  "Oats khichdi with veggies",
  "Veg sandwich & soup",
  "Millet dosa & chutney",
  "Lentil salad & soup",
  "Stuffed capsicum & roti",
  "Veg cutlet & salad",
  "Grilled fish & sautéed veggies",
  "Chicken salad bowl",
  "Baked chicken & veggie rice",
  "Egg wrap & salad",
  "Chicken kebab & veg sticks",
];

/* ----- Food items for the Library (with macros) ----- */

const FOOD_ITEMS = [
  { id: 1, name: "Banana (1 medium)", type: "Veg", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { id: 2, name: "Apple (1 medium)", type: "Veg", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { id: 3, name: "Cooked Rice (1 cup)", type: "Veg", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { id: 4, name: "Chapati (1 piece)", type: "Veg", calories: 120, protein: 3, carbs: 18, fat: 3 },
  { id: 5, name: "Idli (1 piece)", type: "Veg", calories: 39, protein: 1.6, carbs: 7.9, fat: 0.2 },
  { id: 6, name: "Plain Dosa (1 medium)", type: "Veg", calories: 133, protein: 2.7, carbs: 18, fat: 5 },
  { id: 7, name: "Boiled Egg (1)", type: "Non-veg", calories: 78, protein: 6, carbs: 0.6, fat: 5 },
  { id: 8, name: "Milk (1 cup)", type: "Veg", calories: 103, protein: 8, carbs: 12, fat: 2.4 },
  { id: 9, name: "Oats (40 g cooked)", type: "Veg", calories: 150, protein: 5, carbs: 27, fat: 3 },
  { id: 10, name: "Paneer (50 g)", type: "Veg", calories: 132, protein: 9, carbs: 2, fat: 10 },
  { id: 11, name: "Grilled Chicken (100 g)", type: "Non-veg", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 12, name: "Curd / Yogurt (100 g)", type: "Veg", calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3 },
  { id: 13, name: "Sprouts (1 cup)", type: "Veg", calories: 30, protein: 3, carbs: 5.9, fat: 0.4 },
  { id: 14, name: "Almonds (10 pieces)", type: "Veg", calories: 70, protein: 3, carbs: 2.5, fat: 6.1 },
  { id: 15, name: "Fish Curry (100 g)", type: "Non-veg", calories: 150, protein: 18, carbs: 4, fat: 6 },
  { id: 16, name: "Veg Biryani (1 cup)", type: "Veg", calories: 220, protein: 4, carbs: 35, fat: 7 },
  { id: 17, name: "Chicken Biryani (1 cup)", type: "Non-veg", calories: 240, protein: 9, carbs: 32, fat: 9 },
  { id: 18, name: "Sambar (1 cup)", type: "Veg", calories: 100, protein: 5, carbs: 15, fat: 2 },
  { id: 19, name: "Mixed Veg Sabzi (1 cup)", type: "Veg", calories: 120, protein: 4, carbs: 16, fat: 5 },
  { id: 20, name: "Chole (1 cup)", type: "Veg", calories: 210, protein: 10, carbs: 30, fat: 6 },
];

/* ================== MAIN APP ================== */

function App() {
  const [authUser, setAuthUser] = useState(null); // { email }
  const [isAdmin, setIsAdmin] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    study: "",
    age: "",
    height: "",
    weight: "",
    dietPreference: "Veg",
  });

  const [planSettings, setPlanSettings] = useState({
    durationLabel: "1 Month",
    weeks: 4,
    activity: "Moderate",
  });

  const [dietPlan, setDietPlan] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeUserView, setActiveUserView] = useState("profile"); // 'profile' | 'plan' | 'diet' | 'library'
  const [selectedFoods, setSelectedFoods] = useState([]); // [{...food, quantity}]

  const userName = userInfo.name || "User";

  /* ---------- Auth handlers ---------- */

  const handleUserLogin = (email) => {
    setAuthUser({ email });
    setIsAdmin(false);
    setActiveUserView("profile");
  };

  const handleLogout = () => {
    setAuthUser(null);
    setIsAdmin(false);
    setDietPlan([]);
    setSelectedFoods([]);
  };

  const handleAdminLogin = (email, password) => {
    if (email === "admin@dietapp.com" && password === "admin123") {
      setAuthUser({ email });
      setIsAdmin(true);
    } else {
      alert("Invalid admin credentials.\nUse admin@dietapp.com / admin123");
    }
  };

  /* ---------- User flow handlers ---------- */

  const handleProfileSubmit = () => {
    const { name, age, height, weight, dietPreference } = userInfo;
    if (!name || !age || !height || !weight || !dietPreference) {
      alert("Please fill all required fields, including Veg / Non-veg.");
      return;
    }
    setActiveUserView("plan");
  };

  const handlePlanSubmit = () => {
    const selected = DURATIONS.find((d) => d.label === planSettings.durationLabel);
    const weeks = selected ? selected.weeks : 4;
    const pref = userInfo.dietPreference === "Non-veg" ? "Non-veg" : "Veg";

    const bList = pref === "Veg" ? VEG_BREAKFAST : NONVEG_BREAKFAST;
    const lList = pref === "Veg" ? VEG_LUNCH : NONVEG_LUNCH;
    const dList = pref === "Veg" ? VEG_DINNER : NONVEG_DINNER;

    const generated = [];
    for (let i = 0; i < weeks; i++) {
      generated.push({
        weekNumber: i + 1,
        breakfast: bList[i % bList.length],
        lunch: lList[i % lList.length],
        dinner: dList[i % dList.length],
      });
    }
    setDietPlan(generated);

    // Save summary for admin
    const summary = {
      id: Date.now(),
      name: userInfo.name,
      email: authUser?.email || "",
      study: userInfo.study,
      age: userInfo.age,
      height: userInfo.height,
      weight: userInfo.weight,
      duration: selected?.label || planSettings.durationLabel,
      activity: planSettings.activity,
      dietPreference: userInfo.dietPreference,
    };
    setAllUsers((prev) => [...prev, summary]);

    setActiveUserView("diet");
  };

  /* ---------- Food selection totals ---------- */

  const nutritionTotals = useMemo(() => {
    return selectedFoods.reduce(
      (acc, item) => {
        acc.calories += item.calories * item.quantity;
        acc.protein += item.protein * item.quantity;
        acc.carbs += item.carbs * item.quantity;
        acc.fat += item.fat * item.quantity;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [selectedFoods]);

  /* ---------- What to show? ---------- */

  // Not logged in → auth screens
  if (!authUser) {
    return <AuthScreens onUserLogin={handleUserLogin} onAdminLogin={handleAdminLogin} />;
  }

  // Admin
  if (isAdmin) {
    return (
      <AdminLayout
        adminEmail={authUser.email}
        users={allUsers}
        onLogout={handleLogout}
      />
    );
  }

  // Normal user
  return (
    <UserLayout
      userName={userName}
      authEmail={authUser.email}
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      planSettings={planSettings}
      setPlanSettings={setPlanSettings}
      dietPlan={dietPlan}
      activeView={activeUserView}
      setActiveView={setActiveUserView}
      onProfileSubmit={handleProfileSubmit}
      onPlanSubmit={handlePlanSubmit}
      onLogout={handleLogout}
      foodItems={FOOD_ITEMS}
      selectedFoods={selectedFoods}
      setSelectedFoods={setSelectedFoods}
      nutritionTotals={nutritionTotals}
    />
  );
}

/* ================== AUTH SCREENS ================== */

function AuthScreens({ onUserLogin, onAdminLogin }) {
  const [mode, setMode] = useState("user"); // 'user' | 'admin'

  return mode === "admin" ? (
    <AdminLoginScreen
      onBack={() => setMode("user")}
      onAdminLogin={onAdminLogin}
    />
  ) : (
    <UserLoginScreen
      onLogin={onUserLogin}
      onAdminClick={() => setMode("admin")}
    />
  );
}

function UserLoginScreen({ onLogin, onAdminClick }) {
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    onLogin(email);
  };

  const handleGoogle = () => {
    onLogin("user@gmail.com"); // demo
  };

  return (
    <div className="page-center">
      <div className="hero-left">
        <h1 className="app-title">
          Nutri<span className="app-title-highlight">Balance</span>
        </h1>
        <p className="app-subtitle">
          A modern platform to balance diets and detect{" "}
          <span className="highlight-green">nutrient gaps</span> in children and teens.
        </p>
        <p className="app-tagline">
          Personalized diet plans ·{" "}
          <span className="highlight-pill">Smart food tracking</span> ·
          Simple & clean experience.
        </p>
      </div>

      <div className="panel fade-in-up">
        <div className="panel-header">
          <button
            className={`tab-btn ${authMode === "login" ? "tab-active" : ""}`}
            onClick={() => setAuthMode("login")}
          >
            Login
          </button>
          <button
            className={`tab-btn ${authMode === "signup" ? "tab-active" : ""}`}
            onClick={() => setAuthMode("signup")}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={submit} className="panel-body">
          <label className="field-label">
            Email
            <input
              type="email"
              className="field-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="field-label">
            Password
            <input
              type="password"
              className="field-input"
              placeholder={
                authMode === "login" ? "Enter password" : "Create password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </label>

          <button type="submit" className="primary-btn full-width">
            {authMode === "login" ? "Login" : "Create account"}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="secondary-btn full-width"
            onClick={handleGoogle}
          >
            Continue with Google
          </button>

          <div className="admin-link">
            <button type="button" className="link-btn" onClick={onAdminClick}>
              Login as admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminLoginScreen({ onBack, onAdminLogin }) {
  const [email, setEmail] = useState("admin@dietapp.com");
  const [password, setPassword] = useState("admin123");

  const submit = (e) => {
    e.preventDefault();
    onAdminLogin(email, password);
  };

  return (
    <div className="page-center">
      <div className="panel fade-in-up">
        <div className="panel-header single">
          <h2 className="panel-title">Admin Portal</h2>
        </div>
        <form onSubmit={submit} className="panel-body">
          <label className="field-label">
            Admin email
            <input
              type="email"
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="field-label">
            Password
            <input
              type="password"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="primary-btn full-width">
            Login as admin
          </button>

          <button
            type="button"
            className="link-btn center-link"
            onClick={onBack}
          >
            ← Back to user login
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================== USER LAYOUT ================== */

function UserLayout({
  userName,
  authEmail,
  userInfo,
  setUserInfo,
  planSettings,
  setPlanSettings,
  dietPlan,
  activeView,
  setActiveView,
  onProfileSubmit,
  onPlanSubmit,
  onLogout,
  foodItems,
  selectedFoods,
  setSelectedFoods,
  nutritionTotals,
}) {
  return (
    <div className="page-layout">
      <header className="header-bar">
        <div>
          <h1 className="header-title">
            Nutri<span className="app-title-highlight">Balance</span>
          </h1>
          <p className="header-subtitle">
            Hi, <span className="highlight-green">{userName}</span>. Let&apos;s keep your
            diet balanced and smart.
          </p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-email">{authEmail}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeView === "profile" ? "nav-tab-active" : ""}`}
          onClick={() => setActiveView("profile")}
        >
          Profile
        </button>
        <button
          className={`nav-tab ${activeView === "plan" ? "nav-tab-active" : ""}`}
          onClick={() => setActiveView("plan")}
        >
          Goal & Duration
        </button>
        <button
          className={`nav-tab ${activeView === "diet" ? "nav-tab-active" : ""}`}
          onClick={() => setActiveView("diet")}
          disabled={!dietPlan.length}
        >
          Weekly Diet Plan
        </button>
        <button
          className={`nav-tab ${activeView === "library" ? "nav-tab-active" : ""}`}
          onClick={() => setActiveView("library")}
        >
          Food Library
        </button>
      </nav>

      <main className="content">
        {activeView === "profile" && (
          <ProfileView
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            onContinue={onProfileSubmit}
          />
        )}

        {activeView === "plan" && (
          <PlanView
            planSettings={planSettings}
            setPlanSettings={setPlanSettings}
            onBack={() => setActiveView("profile")}
            onGenerate={onPlanSubmit}
          />
        )}

        {activeView === "diet" && (
          <DietPlanView
            userInfo={userInfo}
            planSettings={planSettings}
            dietPlan={dietPlan}
            onChangeDuration={() => setActiveView("plan")}
            onGoLibrary={() => setActiveView("library")}
          />
        )}

        {activeView === "library" && (
          <FoodLibraryView
            foodItems={foodItems}
            selectedFoods={selectedFoods}
            setSelectedFoods={setSelectedFoods}
            nutritionTotals={nutritionTotals}
          />
        )}
      </main>
    </div>
  );
}

/* ----- Profile View ----- */

function ProfileView({ userInfo, setUserInfo, onContinue }) {
  return (
    <section className="content-card fade-in-up">
      <h2 className="section-title">
        Your <span className="highlight-green">profile</span>
      </h2>
      <p className="section-subtitle">
        Share a few basic details so we can design a realistic diet plan just for you.
      </p>

      <div className="grid-2">
        <TextField
          label="Full name"
          placeholder="e.g., Vishal"
          value={userInfo.name}
          onChange={(v) => setUserInfo({ ...userInfo, name: v })}
          required
        />
        <TextField
          label="Class / Study"
          placeholder="e.g., 10th standard"
          value={userInfo.study}
          onChange={(v) => setUserInfo({ ...userInfo, study: v })}
        />
        <TextField
          label="Age (years)"
          type="number"
          placeholder="e.g., 15"
          value={userInfo.age}
          onChange={(v) => setUserInfo({ ...userInfo, age: v })}
          required
        />
        <TextField
          label="Height (cm)"
          type="number"
          placeholder="e.g., 160"
          value={userInfo.height}
          onChange={(v) => setUserInfo({ ...userInfo, height: v })}
          required
        />
        <TextField
          label="Weight (kg)"
          type="number"
          placeholder="e.g., 55"
          value={userInfo.weight}
          onChange={(v) => setUserInfo({ ...userInfo, weight: v })}
          required
        />
        <SelectField
          label="Diet type"
          value={userInfo.dietPreference}
          options={["Veg", "Non-veg"]}
          onChange={(val) => setUserInfo({ ...userInfo, dietPreference: val })}
        />
      </div>

      <div className="actions-right">
        <button className="primary-btn" onClick={onContinue}>
          Confirm & continue →
        </button>
      </div>
    </section>
  );
}

/* ----- Plan View ----- */

function PlanView({ planSettings, setPlanSettings, onBack, onGenerate }) {
  return (
    <section className="content-card fade-in-up">
      <h2 className="section-title">
        Select <span className="highlight-green">goal duration</span>
      </h2>
      <p className="section-subtitle">
        Choose how long you want to follow this diet plan and your daily activity level.
      </p>

      <div className="grid-2">
        <SelectField
          label="Diet plan duration"
          value={planSettings.durationLabel}
          options={DURATIONS.map((d) => d.label)}
          onChange={(label) => {
            const d = DURATIONS.find((x) => x.label === label);
            setPlanSettings({
              ...planSettings,
              durationLabel: label,
              weeks: d ? d.weeks : 4,
            });
          }}
        />
        <SelectField
          label="Daily physical activity"
          value={planSettings.activity}
          options={ACTIVITY_LEVELS}
          onChange={(v) =>
            setPlanSettings({
              ...planSettings,
              activity: v,
            })
          }
        />
      </div>

      <div className="pill-row">
        <span className="pill">
          Duration: {planSettings.durationLabel} ({planSettings.weeks} weeks)
        </span>
        <span className="pill">Activity: {planSettings.activity} level</span>
      </div>

      <div className="actions-space-between">
        <button className="secondary-btn" onClick={onBack}>
          ← Back
        </button>
        <button className="primary-btn" onClick={onGenerate}>
          Generate weekly diet plan →
        </button>
      </div>
    </section>
  );
}

/* ----- Diet Plan View ----- */

function DietPlanView({
  userInfo,
  planSettings,
  dietPlan,
  onChangeDuration,
  onGoLibrary,
}) {
  return (
    <>
      <section className="summary-row fade-in-up">
        <div className="small-card">
          <p className="small-label">Name</p>
          <p className="small-value">{userInfo.name || "-"}</p>
        </div>
        <div className="small-card">
          <p className="small-label">Age</p>
          <p className="small-value">{userInfo.age || "-"}</p>
        </div>
        <div className="small-card">
          <p className="small-label">Height</p>
          <p className="small-value">
            {userInfo.height ? `${userInfo.height} cm` : "-"}
          </p>
        </div>
        <div className="small-card">
          <p className="small-label">Weight</p>
          <p className="small-value">
            {userInfo.weight ? `${userInfo.weight} kg` : "-"}
          </p>
        </div>
        <div className="small-card">
          <p className="small-label">Duration</p>
          <p className="small-value">{planSettings.durationLabel}</p>
        </div>
        <div className="small-card">
          <p className="small-label">Activity</p>
          <p className="small-value">{planSettings.activity}</p>
        </div>
        <div className="small-card">
          <p className="small-label">Diet type</p>
          <p className="small-value">{userInfo.dietPreference}</p>
        </div>
      </section>

      <section className="content-card fade-in-up">
        <h2 className="section-title">
          Weekly <span className="highlight-green">Diet Plan</span>
        </h2>
        <p className="section-subtitle">
          Each week has breakfast, lunch and dinner suggestions—based on your{" "}
          {userInfo.dietPreference.toLowerCase()} preference.
        </p>

        <div className="weeks-grid">
          {dietPlan.map((week) => (
            <div key={week.weekNumber} className="week-card">
              <h3 className="week-title">Week {week.weekNumber}</h3>
              <ul className="meal-list">
                <li>
                  <span className="meal-label">Breakfast</span>
                  <span className="meal-value">{week.breakfast}</span>
                </li>
                <li>
                  <span className="meal-label">Lunch</span>
                  <span className="meal-value">{week.lunch}</span>
                </li>
                <li>
                  <span className="meal-label">Dinner</span>
                  <span className="meal-value">{week.dinner}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="actions-space-between">
          <button className="secondary-btn" onClick={onChangeDuration}>
            ← Change duration
          </button>
          <button className="primary-btn" onClick={onGoLibrary}>
            Go to Food Library →
          </button>
        </div>
      </section>
    </>
  );
}

/* ----- Food Library View (list + cart + totals) ----- */

function FoodLibraryView({
  foodItems,
  selectedFoods,
  setSelectedFoods,
  nutritionTotals,
}) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All"); // All / Veg / Non-veg

  const filtered = useMemo(() => {
    return foodItems.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchType =
        filterType === "All" ? true : item.type === filterType;
      return matchSearch && matchType;
    });
  }, [foodItems, search, filterType]);

  const handleAdd = (item) => {
    setSelectedFoods((prev) => {
      const existing = prev.find((f) => f.id === item.id);
      if (existing) {
        return prev.map((f) =>
          f.id === item.id ? { ...f, quantity: f.quantity + 1 } : f
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemove = (itemId) => {
    setSelectedFoods((prev) => prev.filter((f) => f.id !== itemId));
  };

  const handleClear = () => {
    setSelectedFoods([]);
  };

  return (
    <section className="content-card fade-in-up">
      <h2 className="section-title">
        Food <span className="highlight-green">Library</span>
      </h2>
      <p className="section-subtitle">
        Browse common foods, add them to your day, and instantly see total calories,
        protein, carbs and fat—just like a real tracking app.
      </p>

      <div className="library-layout">
        {/* Left: Food list */}
        <div className="food-list">
          <div className="food-toolbar">
            <input
              className="field-input flex-1"
              placeholder="Search food (eg. banana, rice, egg...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="field-input food-filter"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Veg">Veg</option>
              <option value="Non-veg">Non-veg</option>
            </select>
          </div>

          <div className="food-items-grid">
            {filtered.map((item) => (
              <div key={item.id} className="food-card">
                <div className="food-card-main">
                  <p className="food-name">{item.name}</p>
                  <p className="food-type">
                    {item.type === "Veg" ? "🟢 Veg" : "🍗 Non-veg"}
                  </p>
                </div>
                <div className="food-macros">
                  <span>{item.calories} kcal</span>
                  <span>{item.protein} g protein</span>
                  <span>{item.carbs} g carbs</span>
                  <span>{item.fat} g fat</span>
                </div>
                <button className="secondary-btn food-add-btn" onClick={() => handleAdd(item)}>
                  + Add
                </button>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="empty-message">
                No foods match this search. Try a different name.
              </p>
            )}
          </div>
        </div>

        {/* Right: Cart & totals */}
        <div className="cart-panel">
          <h3 className="cart-title">Today&apos;s intake</h3>
          <p className="cart-subtitle">Foods you added in this session.</p>

          <div className="cart-summary">
            <div className="nutri-item">
              <p className="small-label">Calories</p>
              <p className="small-value">{nutritionTotals.calories.toFixed(0)} kcal</p>
            </div>
            <div className="nutri-item">
              <p className="small-label">Protein</p>
              <p className="small-value">{nutritionTotals.protein.toFixed(1)} g</p>
            </div>
            <div className="nutri-item">
              <p className="small-label">Carbs</p>
              <p className="small-value">{nutritionTotals.carbs.toFixed(1)} g</p>
            </div>
            <div className="nutri-item">
              <p className="small-label">Fat</p>
              <p className="small-value">{nutritionTotals.fat.toFixed(1)} g</p>
            </div>
          </div>

          <div className="cart-items">
            {selectedFoods.length === 0 && (
              <p className="empty-message">
                No items added yet. Click <strong>+ Add</strong> on any food.
              </p>
            )}

            {selectedFoods.map((item) => (
              <div key={item.id} className="cart-row">
                <div className="cart-row-main">
                  <p className="cart-food-name">{item.name}</p>
                  <span className="cart-quantity">× {item.quantity}</span>
                </div>
                <div className="cart-row-right">
                  <span className="cart-row-cal">
                    {(item.calories * item.quantity).toFixed(0)} kcal
                  </span>
                  <button
                    className="link-btn"
                    type="button"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedFoods.length > 0 && (
            <button className="secondary-btn full-width cart-clear-btn" onClick={handleClear}>
              Clear all
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================== ADMIN LAYOUT ================== */

function AdminLayout({ adminEmail, users, onLogout }) {
  return (
    <div className="page-layout">
      <header className="header-bar">
        <div>
          <h1 className="header-title">
            Nutri<span className="app-title-highlight">Balance Admin</span>
          </h1>
          <p className="header-subtitle">
            Track user profiles and generated plans in this session.
          </p>
        </div>
        <div className="header-right">
          <span className="user-email">{adminEmail}</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="content">
        <section className="content-card fade-in-up">
          <h2 className="section-title">
            User <span className="highlight-green">details</span>
          </h2>
          <p className="section-subtitle">
            Shows all users who created a plan while this app is open.
          </p>

          {users.length === 0 && (
            <p>No users yet. Ask someone to login and generate a diet plan.</p>
          )}

          <div className="users-grid">
            {users.map((u) => (
              <div key={u.id} className="user-card">
                <h3 className="user-name">{u.name || "Unnamed user"}</h3>
                <p className="user-email">{u.email}</p>
                <div className="user-row">
                  <span>Age: {u.age}</span>
                  <span>Height: {u.height} cm</span>
                  <span>Weight: {u.weight} kg</span>
                </div>
                <div className="user-row">
                  <span>Study: {u.study || "-"}</span>
                </div>
                <div className="user-row">
                  <span>Duration: {u.duration}</span>
                  <span>Activity: {u.activity}</span>
                </div>
                <div className="user-row">
                  <span>Diet type: {u.dietPreference}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ================== SMALL UI HELPERS ================== */

function TextField({ label, value, onChange, placeholder, type = "text", required }) {
  return (
    <label className="field-label">
      {label}
      <input
        type={type}
        className="field-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="field-label">
      {label}
      <select
        className="field-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export default App;