package in.project.billingsoftware;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan
// It tells Spring Boot to start the app, configure it, and scan for components automatically

//pom.xml file is used for dependency management and build configuration with Maven.
//
//		It tells Maven what dependencies your project needs, such as Spring Boot, database connectors, and libraries.
//
//		It also defines how the project should be built, including plugins, goals, and properties.
//
//		- Dependencies section: Lists libraries (like Spring Boot) needed for the project.
//		- Build section: Defines how the project is built and packaged.
//		- Properties section: Sets the Java version and Spring Boot version.

@SpringBootApplication
public class BillingsoftwareApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingsoftwareApplication.class, args);
	}

}
