def dashboard_admin(username):
    """
    dashboard function to display page for information on submission on users with scores provided
    """
    con = sql.connect('test.db') # remember to declare the connection and cursor in the same method
    headers = ["NAME", "USERNAME", "COLLEGE", "DEPARTMENT", "EMAIL", "SUBMISSION_STATUS", "SCORE"]

    #rember to append <a> <a> to the end of the profile page make it a button with view profile
    cur = con.cursor()
    listy =  cur.execute("SELECT name, username, college, department, email, submission, score FROM users")
    applicants_list = [{ki:v for ki, v in zip(headers, j)} for j in listy]
    boxers = "boxers"
    con.close()
    return render_template("dashboard/admin_dashboard.html", username = username, applicants_list = applicants_list, boxers = boxers, headers = headers)

def assess(username):
    """
    the function provides a page for HOD (Heads of department) to submit assessment of members of their deparment
    """
    print(username)
    con = sql.connect('test.db')
    cur = con.cursor()
    listy = cur.execute("SELECT hod FROM users WHERE username = ?", [username])
    hod_list = [[j for j in i] for i in listy]
    hod = hod_list[0][0]
    if hod != "yes":
        return render_template('dashboard/cant_assess.html')

    if request.method == "POST":
        # data = request.form.to_dict(flat=False)
        # print(jsonify(data))
        name = request.form.get("name")
        department = request.form.get("department")
        college = request.form.get("college")
        email = request.form.get("email")
        recommendation = request.form.get("recommendation")
        cur.execute("UPDATE users SET submission = ? WHERE name = ?, department = ?", ("done", name, department))
        con.commit()
        con.close()
        return redirect(url_for('dashboard_user'))
    
    return render_template('dashboard/assess.html')


def cant_assess():
    """
    the function rejects the request for a member of staff to submit an assessment if he/she is not the hod.
    """
    return render_template('dashboard/cant_assess.html')


def admin_assess(username):
    con = sql("test.db")
    cur = con.cursor()
    listor = cur.execute("SELECT name, username FROM users WHERE submission = ?",("done",))

    con.close
    return render_template("/dashboard/admin_assess.html", username = username)