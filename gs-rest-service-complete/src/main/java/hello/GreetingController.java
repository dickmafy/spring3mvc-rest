package hello;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
        //ENTRAR EN http://localhost:8080/greeting
    }
    
    @RequestMapping("/iniciarSesion")
    public 
    @ResponseBody Usuario iniciarSesion(
    		@RequestParam(value="nombreUsuario", required=true) String nombreUsuario,
    		@RequestParam(value="clave", required=true) String clave
    		) {
    	System.out.println("JAVA SERVIDOR - Validando Usuario");
    	Usuario usuario = null;
    	if(nombreUsuario.equals("a") && clave.equals("a")){
    		usuario = new Usuario("diego",1);
    	}else{
    		usuario = new Usuario("invitado",2);
    	}
    	return usuario;
        
        //ENTRAR EN http://localhost:8080/greeting
    }
    
    
    
}
