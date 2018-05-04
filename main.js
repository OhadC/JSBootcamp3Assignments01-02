"use strict";

(function init() {
    const MainController = require('./controllers/main-controller')
    const mainController = new MainController()
    
    mainController.init()
})()
