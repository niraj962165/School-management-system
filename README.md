# ALIES International School - Web Application

Welcome to the ALIES International School Management Portal project! 
This project features a fully authenticated frontend system merged securely with a SQLite backend to actively track student and faculty data dynamically.

## How to Start the App (From Scratch)

Whenever you open up this project folder on your computer to work on it (without me), you must launch the local Node server so that the Student Logins, Database checks, and routing work correctly! If you just open `home.html` in your browser natively, nothing will connect.

**Follow these exact steps:**

1. **Open Your Terminal**  
   Open Visual Studio Code (VSCode), drag the `final project 1 2025` folder into it, and open a brand new Terminal (`Terminal -> New Terminal` at the top bar).

2. **Boot up the Server**  
   Inside the terminal window, exactly type the following command to turn on the engine and hit Enter:
   ```bash
   node server.js
   ```

3. **Open the Website**  
   Once you see it say `🟢 SQL records initialized securely. Ready for login.`, open Google Chrome (or any browser) and manually type in this exact URL:
   ```text
   http://localhost:5000
   ```
   *Your fully rendered `home.html` will instantly load magically onto the screen with everything connected!*

4. **Testing Logins**  
   Navigate to the Student Login portal via the top menu panel. 
   - **ID**: `S601` (Or any 'S' number up to S1210)
   - **Password**: `S601`
   It will magically fetch Aarav Sharma's details right out of the local SQL database into his own dashboard!

## How to Stop the App
When you are entirely finished working and want to shut the site down cleanly, click on the terminal window where the server is running and press:
**`Ctrl + C`** on your keyboard to instantly kill it.

---

### Folder Architecture Guide
If you need to edit code in the future:
- **`css/`** → Controls all website colors, fonts, and layouts.
- **`js/`** → Controls animations, fetch requests, and frontend logic.
- **`auth/`** → Contains your pure login `.html` pages.
- **`portals/`** → Contains the dashboard `.html` interfaces (like `student_portal.html`).
- **`classroom/`** → Contains your `live.html` interface layout.
- **`server.js`** → The core backend node architecture!

Happy coding! If something breaks, remember to check the terminal for any error logs.
