package org.algoritmed.amlis001.algoritmedlis001;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PrincipalRest extends XCommon{
	@Autowired protected Environment env;

	@GetMapping("/r/principal")
	public @ResponseBody Map<String, Object> principal(Principal principal) {
		Map<String, Object> map = new HashMap<>();
		map.put("m", principal);
		String amConfigFile = env.getProperty("am.configFile");
		map.put("amConfigFile", amConfigFile);
		Map<String, Object> config = readJsonFromFullFileName(amConfigFile);
		map.put("config", config);
		return map;
	}

}
