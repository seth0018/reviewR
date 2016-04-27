var app = {

    init: function (ev) {

        var pages = document.querySelectorAll("[data-role=page]");
            [].forEach.call(pages, function (obj, index) {
            obj.className = "inactive-page";
            if (index == 0) {
                obj.className = "active-page";
            }
                
                
        });

        
        
        
        
        
        //called after DOMContentLoaded 
        document.querySelector("#btnfab").addEventListener("click", app.navigate);
        
         document.querySelector("#back").setAttribute("data-href", "listreview");
        document.querySelector("#back").addEventListener("click", app.navigate);
        document.querySelector("#readback").setAttribute("data-href", "listreview");
        document.querySelector("#readback").addEventListener("click", app.navigate);
        document.querySelector("#checkreview").setAttribute("data-href", "listreview");
        document.querySelector("#checkreview").addEventListener("click", app.navigate);
        document.querySelector("#close").setAttribute("data-href", "listreview");
        document.querySelector("#close").addEventListener("click", app.navigate);
        document.querySelector('#check').addEventListener("click", app.saveData);
        document.getElementById("camera").addEventListener("click", function () {

            navigator.camera.getPicture(imgSuccess, imgFail, {
                quality: 75,

                destinationType: Camera.DestinationType.DATA_URL,

                sourceType: Camera.PictureSourceType.CAMERA,

                allowEdit: true,

                targetWidth: 100,

                targetHeight: 100,

                cameraDirection: Camera.Direction.FRONT,

                saveToPhotoAlbum: false
            })

            function imgSuccess(data) {
                var img = "data:image/jpeg;base64," + data;
                img = encodeURIComponent(img);
                console.log(img);
                document.getElementById("camera").setAttribute("image", img);

            }

            function imgFail(message) {
                console.log("Image failed to capture" + message);
            }
        });
        window.addEventListener("popstate", app.popPop);


        //get list of thigs for the home page 
        app.getList();
    },
    getList: function () {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://griffis.edumedia.ca/mad9022/reviewr/reviews/get/");

        xhr.addEventListener("load", function (ev) {
            var response = JSON.parse(xhr.responseText);
            console.log(response.reviews);
            console.log(response.reviews.length);
            for (var i = 0; i < response.reviews.length; i++) {
                var li = document.createElement("li");
                li.textContent = response.reviews[i].title;

                if (response.reviews[i].rating == 1) {
                    var img = document.createElement('img');
                    img.src = "img/filled.png";
                    img.width = "20";
                    img.height = "18";
                    img.className = "lirating"
                    li.appendChild(img);
                }
                if (response.reviews[i].rating == 2) {
                    for (var j = 0; j < 2; j++) {
                        var img = document.createElement('img');
                        img.src = "img/filled.png";
                        img.width = "100";
                        img.height = "18";
                        img.className = "lirating"
                        li.appendChild(img);
                    }
                }
                if (response.reviews[i].rating == 3) {
                    for (var j = 0; j < 3; j++) {
                        var img = document.createElement('img');
                        img.src = "img/filled.png";
                        img.width = "20";
                        img.height = "18";
                        img.className = "lirating"
                        li.appendChild(img);
                    }
                }
                if (response.reviews[i].rating == 4) {
                    for (var j = 0; j < 4; j++) {
                        var img = document.createElement('img');
                        img.src = "img/filled.png";
                        img.width = "20";
                        img.height = "18";
                        img.className = "lirating"
                        li.appendChild(img);
                    }
                }
                if (response.reviews[i].rating == 5) {
                    for (var j = 0; j < 5; j++) {
                        var img = document.createElement('img');
                        img.src = "img/filled.png";
                        img.width = "20";
                        img.height = "18";
                        img.className = "lirating"
                        li.appendChild(img);
                    }
                }


                li.setAttribute("data-href", "readreview");
                li.setAttribute("data-id", response.reviews[i].id);

                li.addEventListener("click", function () {
                    var url = this.getAttribute("data-href");
                    history.pushState({
                        "page": url
                    }, null, "#" + url);
                    var pages = document.querySelectorAll("[data-role=page]");
                    for (var p = 0; p < pages.length; p++) {
                        if (pages[p].id === url) {
                            pages[p].classList.remove("hidden");
                            if (pages[p].className !== "active-page") {
                                pages[p].className = "active-page";
                            }
                        } else {
                            if (pages[p].className !== "inactive-page") {
                                pages[p].className = "inactive-page";
                            }
                        }
                    }

                    var id = this.getAttribute("data-id");
                    console.log(id);

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "https://griffis.edumedia.ca/mad9022/reviewr/review/get/");
                    var params1 = new FormData();
                    params1.append("uuid", "seth0018");
                    params1.append("review_id", id);
                    xhr.send(params1);
                    xhr.addEventListener("load", function (ev) {
                        var response = JSON.parse(xhr.responseText);
                        console.log(response);
                        console.log(response.review_details.title);
                        document.getElementById("fetchedtitle").innerHTML = response.review_details.title;
                        document.getElementById("fetchedreview").innerHTML = response.review_details.review_txt;
                        if (response.review_details.rating == 1) {
                            var img = document.createElement('img');
                            img.src = "img/filled.png";
                            img.width = "20";
                            img.height = "18";
                            img.className = "lirating"
                            document.getElementById("fetchedreview").appendChild(img);

                        } else if (response.review_details.rating == 2) {
                            for (var i = 0; i < 2; i++) {
                                var img = document.getElementById('displayrate');
                                img.src = "img/filled.png";
                                img.width = "20";
                                img.height = "18";
                                img.className = "lirating";
                            }
                        } else if (response.review_details.rating == 3) {
                            for (var i = 0; i < 3; i++) {
                                var img = document.createElement('img');
                                img.src = "img/filled.png";
                                img.width = "20";
                                img.height = "18";
                                img.className = "lirating"
                                document.getElementById("fetchedreview").appendChild(img);
                            }
                        } else if (response.review_details.rating == 4) {
                            for (var i = 0; i < 4; i++) {
                                var img = document.createElement('img');
                                img.src = "img/filled.png";
                                img.width = "20";
                                img.height = "18";
                                img.className = "lirating"
                                document.getElementById("fetchedreview").appendChild(img);
                            }
                        } else if (response.review_details.rating == 5) {
                            for (var i = 0; i < 5; i++) {
                                var img = document.createElement('img');
                                img.src = "img/filled.png";
                                img.width = "20";
                                img.height = "18";
                                img.className = "lirating"
                                document.getElementById("fetchedreview").appendChild(img);
                            }
                        } else {

                        }
                        document.getElementById("displayimg").src = decodeURIComponent(response.review_details.img);
                    });
                });
                document.querySelector("#listreview ul").appendChild(li);
            }
        });
        xhr.addEventListener("error", function (ev) {});
        var params = new FormData();
        params.append("uuid", "seth0018");
        xhr.send(params);
    },
    navigate: function (ev) {
        ev.preventDefault();
        var url = ev.target.getAttribute("data-href");
        console.log(url);
        history.pushState({
            "page": url
        }, null, "#" + url);
        var pages = document.querySelectorAll("[data-role=page]");
        for (var p = 0; p < pages.length; p++) {
            if (pages[p].id === url) {
                pages[p].classList.remove("hidden");
                if (pages[p].className !== "active-page") {
                    pages[p].className = "active-page";
                }
            } else {
                if (pages[p].className !== "inactive-page") {
                    pages[p].className = "inactive-page";
                }
            }
        }
    },
    popPop: function (ev) {

        history.back();
    },
    saveData: function (ev) {
        var cnt = 0;
        var title = document.getElementById("title").value;
        var review = document.getElementById("review").value;
        var rating = document.getElementsByName("rating");
        var rate;
        var filepath;
        var img;
        for (var i = 0; i < rating.length; i++) {
            if (rating[i].checked)
                rate = rating[i].value;
        }
        if (rate == undefined) {
            rate = 0;
        }
        console.log(rate);
        var img = document.getElementById("camera").getAttribute("image");
        console.log(img);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://griffis.edumedia.ca/mad9022/reviewr/review/set/");

        var sendparams = new FormData();
        sendparams.append("uuid", "seth0018");
        sendparams.append("action", "insert");
        console.log("Title is:" + title);
        console.log("Review is:" + review);
        sendparams.append("title", title);
        sendparams.append("review_txt", review);
        sendparams.append("rating", rate);

        sendparams.append("img", img);

        xhr.send(sendparams);

        xhr.addEventListener("load", function (ev) {
            var xhr = ev.target;
            var response = JSON.parse(xhr.responseText);
            if (response.code == 0) {
                console.log("Record added successfully");
                location.reload();
            } else {
                console.log("Record not added successfully");
            }
        });
        xhr.addEventListener("error", function (ev) {

        });


    },

};
document.addEventListener("DOMContentLoaded", app.init);
