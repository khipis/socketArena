import static spark.Spark.get;

public class SocketArena {

    public static void main(String[] args) {

        get("/hello", (req, res) -> "Hello World");
    }
}