package org.algoritmed.amlis001.algoritmedlis001;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@PropertySource("classpath:a2.properties")
public class AmLis001ConfigAndSecurity extends WebSecurityConfigurerAdapter {
	
	protected void configure(HttpSecurity http) throws Exception {
		startH2Server();

//		CookieCsrfTokenRepository withHttpOnlyFalse = CookieCsrfTokenRepository.withHttpOnlyFalse();
		http
		.csrf()
			.disable() /* enable POST */
		.authorizeRequests()
		.antMatchers("/" /* index.html from static */
			, "/v/**" /* view HTML sites*/
			, "/f/**" /* files for sites*/
			, "/r/**" /* read JSON from server*/
			, "/webjars/**" /* CSS&JS from gradle */
		).permitAll()
		.anyRequest()
		.fullyAuthenticated()
//		.authenticated()
		.and()
		.formLogin()
		.successHandler(successHandler)
		.loginPage("/login")
		.permitAll()
		.and()
		.logout()
		.logoutSuccessHandler(successHandler)
		.permitAll();
	}

	@Autowired private SimpleAuthenticationSuccessHandler successHandler;
	private void startH2Server() {
		String startServerScript = env.getProperty("am.h2.startServerScript");
		String[] cmd = new String[]{"/bin/bash", startServerScript};
		try {
			System.err.println("Attempting to start database service");
			Runtime.getRuntime().exec(cmd);
			System.err.println("Database service started");
		} catch (IOException e) {
			System.err.println("Database service start problem");
			e.printStackTrace();
		}
	}
	@Autowired protected Environment env;
}
