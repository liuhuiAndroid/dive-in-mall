package com.noc.jarvan

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class JarvanApplication

fun main(args: Array<String>) {
    SpringApplication.run(JarvanApplication::class.java, *args)
}
