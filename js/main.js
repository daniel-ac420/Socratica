/* Переменные для активации кнопки */
let themeCheck = false;
let targetCheck = false;


/* Скрытие/показ вариантов тем */
const moreThemesButton = document.querySelector("#more-options");

let themesListItems = document.querySelectorAll(".themes-list__item");

moreThemesButton.addEventListener("click", function() {
	if (!this.classList.contains("expanded")) {
		this.classList.toggle("expanded");
		
		this.textContent = "Скрыть варианты";
		
		for (let element of themesListItems) {
			if (element.classList.contains("visually-hidden")) {
				element.classList.toggle("visually-hidden");
			}
		}
	} else {
		this.classList.toggle("expanded");
		
		this.textContent = "Показать больше вариантов";
		
		for (let element of themesListItems) {
			if (!element.classList.contains("default")) {
				element.classList.toggle("visually-hidden");
			}
		}
	}
})



/* title кнопки показа вариантов тем */
moreThemesButton.addEventListener("mouseenter", function() {
	moreThemesButton.title = moreThemesButton.textContent;
})



/* Смена цвета границы fieldset при focus в input */
let legend = document.querySelectorAll(".form__legend");

let input = document.querySelector(".form__input");

input.addEventListener("focus", function() {
	this.parentElement.style.borderColor = "var(--blueColor)";
})

input.addEventListener("blur", function() {
	this.parentElement.style.borderColor = "var(--lightGray)";
})



/* Заполнение поля темы при клике на тег & смена цвета тега */
for (let themesListItem of themesListItems) {
	themesListItem.addEventListener("mouseenter", function() {
		this.title = this.textContent.trim();
	})
	
	themesListItem.addEventListener("click", function() {
		input.value = this.textContent.trim();
		
		if (input.value == themesListItem.textContent.trim()) {
			/* Исключение дублирования backgroundColor у элементов */
			for (let themesListItem of themesListItems) {
				themesListItem.style.backgroundColor = "var(--bckgrndGray)";
			}	
			
			themesListItem.style.backgroundColor = "var(--blueColor)";
		}
	})
}



/**
Ограничение длины ввода для textarea
Смена цвета границы fieldset при focus в input/textarea
*/
let textarea = document.querySelector(".form__textarea");

let counter = document.querySelector(".chars-counter");

let warning = document.querySelector(".error-warning");

let textAreaWarning = function (event) {
	counter.innerHTML = `${textarea.value.length}&nbsp;/&nbsp;200`;
	console.log(this.value.length);
	if (textarea.value.length > 200) {
		textarea.parentElement.style.border = "1px solid var(--redColor)";
		warning.textContent = "Уменьшите длину ввода до 200 символов";
		counter.classList.add("chars-counter--warning");
	} else if (textarea.value.length <= 200 && event.type === "blur") {
		textarea.parentElement.style.border = "1px solid var(--lightGray)";
		warning.textContent = "";
		counter.classList.remove("chars-counter--warning");
	} else if (textarea.value.length <= 200 && (event.type === "focus" || event.type === "input")) {
		this.parentElement.style.borderColor = "var(--blueColor)";
		warning.textContent = "";
		counter.classList.remove("chars-counter--warning");
	}
}

textarea.addEventListener("input", textAreaWarning);
textarea.addEventListener("focus", textAreaWarning);
textarea.addEventListener("blur", textAreaWarning);



/* Активацяи кнопки "Следующий шаг" */
let buttonNext = document.querySelector(".button--next");

let buttonNextCheck = function () {
	if (input.value.length != 0) {
		themeCheck = true;
	} else {
		themeCheck = false;
	}
	
	if (textarea.value.length == 0 || textarea.value.length > 200) {
		targetCheck = false;
	} else if (textarea.value.length != 0 && textarea.value.length <= 200) {
		targetCheck = true;
	}
	
//	console.log(`themeCheck is ${themeCheck}`);
//	console.log(`targetCheck is ${targetCheck}`);
	
	if (themeCheck == true && targetCheck == true) {
		buttonNext.removeAttribute("disabled");
	} else {
		buttonNext.setAttribute("disabled", "");
	}
}

document.addEventListener("keyup", buttonNextCheck);
document.addEventListener("click", buttonNextCheck);
document.addEventListener("input", buttonNextCheck);