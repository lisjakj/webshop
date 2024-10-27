function doPost(e) {
    const sheet = SpreadsheetApp.openById('1LhMxXfWlKn9RV1z4Ims6wH03SDAxzHdxm5O7yQ1W6iE').getActiveSheet();
    const email = e.parameter.email;
  
    Logger.log("Received email: " + email);
  
    if (!email) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Email not provided' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  
    const data = sheet.getDataRange().getValues();
    const emailExists = data.some(row => row[0] === email);
  
    if (emailExists) {
      Logger.log("Email already exists: " + email);
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Email already exists' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  
    try {
      // Append the email to the Google Sheet
      sheet.appendRow([email]);
      Logger.log("Email added: " + email);
  
      // Send a thank you email with the coupon code
      sendThankYouEmail(email);
  
      const response = {
        status: 'success',
        message: 'Email added successfully',
      };
  
      return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      Logger.log("Error adding email: " + error.toString());
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Error adding email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  function sendThankYouEmail(email) {
    const subject = "Thank You for Subscribing - Here's Your Coupon Code!";
    const couponCode = "SAVE10";
    const htmlBody = `
      <div style="font-family: 'Poppins', sans-serif; text-align: center; background-color: #fdf0d5; padding: 20px; border-radius: 10px;">
        <h1 style="font-family: 'Playfair Display', serif; color: #003049;">Thank You for Joining Us!</h1>
        <p style="color: #003049; font-size: 1.2em;">
          We are thrilled to have you on board. As a token of our appreciation, we have a special gift for you!
        </p>
        <div style="margin: 20px 0; padding: 20px; background-color: #669bbc; color: #fdf0d5; border-radius: 10px;">
          <h2>Your Coupon Code: <span style="font-family: 'Poppins', sans-serif; color: #fff;">${couponCode}</span></h2>
          <p>Use this code at checkout to enjoy a 10% discount on your next purchase.</p>
        </div>
        <p style="color: #003049;">
          Please check your spam folder if you do not see this email in your inbox.
        </p>
        <p style="color: #003049;">Happy Shopping!</p>
        <p style="color: #003049; font-weight: bold;">- The Heartistry Team</p>
      </div>
    `;
  
    // Send the email using MailApp
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody,
    });
  }