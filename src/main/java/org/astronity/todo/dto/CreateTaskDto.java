package org.astronity.todo.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.astronity.todo.enums.TaskStatus;

@Getter
@Setter
@ToString
public class CreateTaskDto {
    private String task;
    private String description;
    private TaskStatus status;
}