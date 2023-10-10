// survey.js

document.addEventListener("DOMContentLoaded", function () {
    const introForm = document.getElementById("introForm");
    const courseFields = document.getElementById("courseFields");
    const addCourseButton = document.getElementById("addCourse");
    //const resetLink = document.getElementById("resetLink");
    const imageInput = document.getElementById("image");
    const previewImage = document.getElementById("previewImage");

    addCourseButton.addEventListener("click", addCourseField);
   // resetLink.addEventListener("click", resetForm);

    introForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission
        if (validateForm()) {
            displayIntroPage();
        }
    });


    function addCourseField() {
        const newCourseInput = document.createElement("input");
        newCourseInput.type = "text";
        newCourseInput.name = "course";
        newCourseInput.placeholder = "Enter course name";

        const newReasonInput = document.createElement("input");
        newReasonInput.type = "text";
        newReasonInput.name = "reason";
        newReasonInput.placeholder = "Enter reason for taking the course";

        const deleteCourseButton = document.createElement("button");
        deleteCourseButton.textContent = "Delete";
        deleteCourseButton.classList.add("delete-course");

        deleteCourseButton.addEventListener("click", function () {
            courseFields.removeChild(newCourseInput);
            courseFields.removeChild(newReasonInput);
            courseFields.removeChild(deleteCourseButton);
        });

        courseFields.appendChild(newCourseInput);
        courseFields.appendChild(newReasonInput);
        courseFields.appendChild(deleteCourseButton);
    }


imageInput.addEventListener("change", function () {
    const file = imageInput.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result; // Set the src attribute of the <img> element to the uploaded image
        };

        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        // If no file is selected or if the browser doesn't support FileReader, you can display a default image or handle it differently.
        previewImage.src = "default-image.jpg"; // Set a default image source
    }
});


function validateForm() {
    const nameInput = document.getElementById("name");
    const mascotInput = document.getElementById("mascot");
    const imageInput = document.getElementById("image");
    const imageCaptionInput = document.getElementById("imageCaption");
    const personalBackgroundInput = document.getElementById("personalBackground");
    const professionalBackgroundInput = document.getElementById("professionalBackground");
    const academicBackgroundInput = document.getElementById("academicBackground");
    const webDevelopmentBackgroundInput = document.getElementById("webDevelopmentBackground");
    const computerPlatformInput = document.getElementById("computerPlatform");
    const agreeCheckbox = document.getElementById("agree");

    // Check if all required fields are filled
    if (
        nameInput.value.trim() === "" ||
        mascotInput.value.trim() === "" ||
        imageInput.value.trim() === "" ||
        imageCaptionInput.value.trim() === "" ||
        personalBackgroundInput.value.trim() === "" ||
        professionalBackgroundInput.value.trim() === "" ||
        academicBackgroundInput.value.trim() === "" ||
        webDevelopmentBackgroundInput.value.trim() === "" ||
        computerPlatformInput.value.trim() === "" ||
        !agreeCheckbox.checked
    ) {
        alert("Please fill out all required fields and agree to the terms.");
        return false;
    }

    return true; // Return true if the form is valid
}

function displayIntroPage() {
    // Gather data from the form
    const name = document.getElementById("name").value;
    const mascot = document.getElementById("mascot").value;
    const imageInput = document.getElementById("image");
    const imageCaption = document.getElementById("imageCaption").value;
    const personalBackground = document.getElementById("personalBackground").value;
    const professionalBackground = document.getElementById("professionalBackground").value;
    const academicBackground = document.getElementById("academicBackground").value;
    const webDevelopmentBackground = document.getElementById("webDevelopmentBackground").value;
    const computerPlatform = document.getElementById("computerPlatform").value;
    const funnyThing = document.getElementById("funnyThing").value;

    // Create a div element to hold the introduction content
    const introContent = document.createElement("div");

    // Display the uploaded image directly from the input element
    const imageUrl = window.URL.createObjectURL(imageInput.files[0]);

    // Gather course data as key-value pairs
    const courseData = [];
    const courseFields = document.querySelectorAll('input[name="course"]');
    const reasonFields = document.querySelectorAll('input[name="reason"]');
    courseFields.forEach(function (courseField, index) {
        const course = courseField.value;
        const reason = reasonFields[index].value;
        courseData.push({ course, reason }); // Store course and reason as key-value pairs
    });

    // Set the innerHTML to the provided structure with the gathered data, including the image, image caption, and course list
    introContent.innerHTML = `
        <h1>${name}</h1>
        <p>
            I understand that what I put here is publicly available on the web, and I won't put anything here I don't want the public to see - ${name} - ${getCurrentDate()}
        </p>
        <p>
            <strong>${name}</strong> || ${mascot}
        </p>
        <img id="portrait" src="${imageUrl}" alt="${name}'s Portrait" style="max-width: 100%; height: auto;">
        <p>${imageCaption}</p> <!-- Display the image caption -->

        <h2>Personal Background:</h2>
        <p>${personalBackground}</p>

        <h2>Professional Background:</h2>
        <ul>
            <li>${professionalBackground}</li>
            <!-- Add more professional background items as needed -->
        </ul>

        <h2>Academic Background:</h2>
        <p>${academicBackground}</p>

        <h2>Background in Web Development:</h2>
        <p>${webDevelopmentBackground}</p> <!-- Display the web development background -->

        <h2>Primary Computer Platform:</h2>
        <p>${computerPlatform}</p>

        <h2>Courses I'm Taking & Why:</h2>
        <ul id="courseList">
            ${courseData.map(item => `<li><strong>${item.course}:</strong> ${item.reason}</li>`).join('')}
        </ul>

        <h2>Funny/Interesting Item to Remember Me By:</h2>
        <p>${funnyThing}</p>

        <a id="resetLink" href="byo_intro.html">Reset Form</a>
    `;

    // Replace the form's content with the introduction content
    const introForm = document.getElementById("introForm");
    introForm.innerHTML = ""; // Clear the form
    introForm.appendChild(introContent);
}





function getCurrentDate() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return formattedDate;
}

function resetForm() {
    introForm.reset();
    while (courseFields.firstChild) {
        courseFields.removeChild(courseFields.firstChild);
    }
}

});

