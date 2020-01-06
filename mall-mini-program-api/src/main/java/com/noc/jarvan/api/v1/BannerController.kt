package com.noc.jarvan.api.v1

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1/banner")
class BannerController {

    @GetMapping("/test")
    fun test(): String {
        return "Hello Jarvan2"
    }

}
