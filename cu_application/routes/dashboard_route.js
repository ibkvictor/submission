// -------- post using local modules --------
app.post("/settings", settings);
app.post("/cantassess", cantAssess);
app.post("/apply", apply);
app.post("/assess", assess);
app.post("/admin_assess", adminAssess);
app.post("/admin_dashboard", dashboardAdmin);

// -------- get using local modules --------
app.get("/settings", settings);
app.get("/cantassess", cantAssess);
app.get("/apply", apply);
app.get("/assess", assess);
app.get("/admin_assess", adminAssess);
app.get("/admin_dashboard", dashboardAdmin);

