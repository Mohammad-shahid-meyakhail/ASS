document.getElementById("calculateBtn").addEventListener("click", () => {
    let name = document.getElementById("name").value.trim();
    let price = parseFloat(document.getElementById("startingBid").value);

    if (!name || isNaN(price)) {
        alert("Please enter both the name and a valid starting bid.");
        return;
    }

    // Calculate education coefficient
    const education = parseFloat(document.getElementById("education").value);
    if (!isNaN(education)) price *= education;

    // Calculate family net worth coefficient
    const netWorth = parseFloat(document.getElementById("netWorth").value);
    if (!isNaN(netWorth)) price *= netWorth;

    // Add caste value
    const caste = parseFloat(document.getElementById("caste").value);
    if (!isNaN(caste)) price += caste;

    // Calculate skills
    const skills = Array.from(document.getElementsByClassName("skills"));
    const skillBonus = skills.filter(skill => skill.checked).reduce((sum, skill) => sum + parseFloat(skill.value || 0), 0);
    price += skillBonus;

    // Calculate age coefficient
    const ages = Array.from(document.getElementsByClassName("age"));
    ages.forEach(age => {
        if (age.checked) {
            const ageValue = parseFloat(age.value);
            if (!isNaN(ageValue)) price *= ageValue;
        }
    });

    // Calculate reputation coefficient
    const reputation = Array.from(document.getElementsByClassName("reputation"));
    for (let i = 0; i < reputation.length; i++) {
        if (reputation[i].checked) {
            const repValue = parseFloat(reputation[i].value);
            if (!isNaN(repValue)) {
                price = (repValue > 0) ? price * repValue : price + repValue;
            }
        }
    }

    // Collect love letter
    const loveLetter = document.getElementById("loveLetter").value;

    // Create the final object
    let person = {
        name: name,
        price: price.toFixed(2),
        loveLetter: loveLetter
    };

    // Display result
    document.getElementById("result").innerHTML = `The dowry for ${person.name} is $${person.price}.<br>Love Letter: ${person.loveLetter}`;
});
