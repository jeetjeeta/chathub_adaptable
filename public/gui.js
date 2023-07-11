const upper_section = document.querySelector(".upper-section");
const lower_section = document.querySelector(".lower-section");
const sidebar = document.querySelector(".sidebar");
const message_section = document.querySelector(".message-section");
const message_highlight = document.querySelector(".message-highlight");
const message_box = document.querySelector(".message-box");

const chat_header = document.querySelector(".chat-header");
const chat_form = document.querySelector(".chat-form-container");
const chat_sidebar = document.querySelector(".chat-sidebar");
const chat_message_section = document.querySelector(".chat-messages");
const messages = document.querySelectorAll(".chat-messages .message");
const chat_form_input = chat_form.querySelector("input");
const chat_form_btn = chat_form.querySelector(".btn");

const bgUpper = upper_section.querySelector("input[type='color']");
const bgLower = lower_section.querySelector("input[type='color']");
const bgSidebar = sidebar.querySelector("input[type='color']");
const bgMessage_section = message_section.querySelector("input[type='color']");
const bgMessage_highlight = message_highlight.querySelector(
  "input[type='color']"
);
const bgMessage_box = message_box.querySelector("input[type='color']");
const sliderMessage_highlight = message_highlight.querySelector(
  'input[type="range"]'
);

const textUpper = upper_section.querySelectorAll("input[type='color']")[1];
const textSidebar = sidebar.querySelectorAll("input[type='color']")[1];
const textMessage = message_section.querySelectorAll("input[type='color']")[1];
const textName = message_section.querySelectorAll("input[type='color']")[2];
const textTime = message_section.querySelectorAll("input[type='color']")[3];
const textMessageBox = message_box.querySelectorAll("input[type='color']")[1];

// console.log(upperRadio);

const switchOn = (str) => {
  if (str === "upper") {
    chat_header.classList.add("darken");
    document.querySelector("#upDartTintStatus").textContent = "On";
  } else if (str === "lower") {
    chat_form.classList.add("darken");
    document.querySelector("#lowDartTintStatus").textContent = "On";
  }
};

const switchOff = (str) => {
  if (str === "upper") {
    chat_header.classList.remove("darken");
    document.querySelector("#upDartTintStatus").textContent = "Off";
  } else if (str === "lower") {
    chat_form.classList.remove("darken");
    document.querySelector("#lowDartTintStatus").textContent = "Off";
  }
};

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function setMessageHighlightOpacity() {
  const obj = hexToRgb(bgMessage_highlight.value);
  let opacity = sliderMessage_highlight.value;
  const color = `rgba(${obj.r},${obj.g},${obj.b},${opacity})`;
  for (let i = 0; i < messages.length; i++) {
    messages[i].style.backgroundColor = color;
  }

  document.querySelector("#message_highlightBGValue").textContent = color;
}

function setMessagesColor(type) {
  let color = "";
  let element = "";
  if (type == "name") {
    color = textName.value;
    document.querySelector("#nameTextValue").textContent = color;
    for (let i = 0; i < messages.length; i++) {
      messages[i].querySelector(".meta").style.color = color;
    }
    // element = "querySelector('.meta')";
  } else if (type == "message") {
    color = textMessage.value;
    document.querySelector("#messageTextValue").textContent = color;
    for (let i = 0; i < messages.length; i++) {
      messages[i].querySelector(".text").style.color = color;
    }
    // element = "querySelector('.text')";
  } else if (type == "time") {
    color = textTime.value;
    document.querySelector("#timeTextValue").textContent = color;
    for (let i = 0; i < messages.length; i++) {
      messages[i].querySelector(".meta span").style.color = color;
    }
    // element = "querySelector('.meta span')";
  }
}

const setBGcolor = (pos) => {
  if (pos == "upper") {
    chat_header.style.backgroundColor = bgUpper.value;
    document.querySelector("#upBGValue").textContent = bgUpper.value;
  } else if (pos == "lower") {
    chat_form.style.backgroundColor = bgLower.value;
    document.querySelector("#lowBGValue").textContent = bgLower.value;
  } else if (pos == "sidebar") {
    chat_sidebar.style.backgroundColor = bgSidebar.value;
    document.querySelector("#sideBGValue").textContent = bgSidebar.value;
  } else if (pos == "message_section") {
    chat_message_section.style.backgroundColor = bgMessage_section.value;
    document.querySelector("#msgLogBGValue").textContent =
      bgMessage_section.value;
  } else if (pos == "message_highlight") {
    setMessageHighlightOpacity();
  } else if (pos == "message_box") {
    chat_form_input.style.backgroundColor = bgMessage_box.value;
    chat_form_btn.style.backgroundColor = bgMessage_box.value;
    document.querySelector("#message_boxBGValue").textContent =
      bgMessage_box.value;
  } else if (pos == "body_background") {
    const bgBody = document.querySelector(
      '.body_background input[type="color"]'
    );
    document.querySelector("body").style.backgroundColor = bgBody.value;
    document.querySelector("#bodyBGValue").textContent = bgBody.value;
  }
};

const setTextColor = (pos) => {
  if (pos === "upper") {
    chat_header.style.color = textUpper.value;
    chat_header.querySelector("a").style.color = textUpper.value;
    document.querySelector("#upTextValue").textContent = textUpper.value;
  } else if (pos === "sidebar") {
    chat_sidebar.style.color = textSidebar.value;
    document.querySelector("#sideTextValue").textContent = textSidebar.value;
  } else if (pos === "name" || pos === "time" || pos === "message") {
    setMessagesColor(pos);
  } else if (pos === "message_box") {
    chat_form_input.style.color = chat_form_btn.style.color =
      textMessageBox.value;
    document.querySelector("#messageBoxTextValue").textContent =
      textMessageBox.value;
  }
};

const toggleCustomization = document.querySelector("#toggleCustomization");
let toggleCustomizationState = false;
// toggleCustomizationBox()
const toggleDisplayLog = document.querySelector("#toggleDisplayLog");
let toggleDisplayLogState = false;
// toggleLogBox()
// guiLog

const toggleCustomizationBox = () => {
  const GUI = document.querySelector(".GUI");

  if (toggleCustomizationState === false) {
    toggleCustomization.classList.add("active");
    GUI.style.display = "flex";
    toggleCustomizationState = true;
  } else {
    toggleCustomization.classList.remove("active");
    GUI.style.display = "none";
    toggleCustomizationState = false;
  }
};

const toggleLogBox = () => {
  const guiLog = document.querySelector(".guiLog");

  if (toggleDisplayLogState === false) {
    toggleDisplayLog.classList.add("active");
    guiLog.style.display = "block";
    toggleDisplayLogState = true;
  } else {
    toggleDisplayLog.classList.remove("active");
    guiLog.style.display = "none";
    toggleDisplayLogState = false;
  }
};
