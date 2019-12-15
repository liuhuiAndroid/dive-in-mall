package com.noc.jarvan.api.v1

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class BannerController {

    @RequestMapping("/")
    fun test(): String {
        return "Hello world"
    }

}
