import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

const FormInscripCurso = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
  return (
    <section className="formCursosContainer">
       <Form>
      <Form.Group className="mb-3" controlId="formnombre">
        <Form.Label>nombre y Apellido</Form.Label>
        <Form.Control type="text" placeholder="Ej:Aixa Filsinger" {...register("nombreyapellido", {
              required:
                "Este campo es obligatorio",
              minLength: {
                value: 5,
                message:
                  "Este campo debe contener minimo 5 caracteres",
              },
              maxLength: {
                value: 100,
                message:
                  "Su nombre y apellido debe contener maximo 100 caracteres",
              }
            })}/>
       <Form.Text className="text-danger">
            {errors.nombreyapellido?.message}
          </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCurso">
          <Form.Label>Curso a elegir</Form.Label>
          <Form.Select
            aria-label="Curso"
            {...register("curso", { required: "Debe elegir una opcion" })}
          >
            <option value="">Seleccione una Categoria</option>
            <option value="Manicura">Manicura</option>
            
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.curso?.message}
          </Form.Text>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formemail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ej:Aixa@gamil.com"  {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'El Email debe contener "@" y terminar en: ".com"',
              },
            })}/>
             <Form.Text className="text-danger">
            {errors.email?.message}
          </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCelular">
        <Form.Label>Celular</Form.Label>
        <Form.Control type="number" placeholder="Ej:3813976548" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        enviar
      </Button>
    </Form>
    </section>
  );
};

export default FormInscripCurso;
