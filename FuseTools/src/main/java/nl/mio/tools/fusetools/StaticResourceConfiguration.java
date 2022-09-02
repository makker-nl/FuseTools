/**
 * Class to add Resource locations for static content folders.
 * Taken from https://stackoverflow.com/questions/24661289/spring-boot-not-serving-static-content 
 */
package nl.mio.tools.fusetools;

import java.util.logging.Logger;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Add Resource locations for static content folders.
 * 
 * @author Martien van den Akker, Virtual Sciences|Conclusion
 */
@Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {
	private static final String CLASS_NAME = StaticResourceConfiguration.class.getName();
	private static final Logger logger = Logger.getLogger(CLASS_NAME);
	private static final String[] CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/META-INF/resources/",
			"classpath:/resources/", "classpath:/static/", "classpath:/public/", "classpath:/web/" };

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		logger.info(this.getClass().getName() + ".addResourceHandlers: add ResourceLocations");
		registry.addResourceHandler("/**").addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
	}

}
