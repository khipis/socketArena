package pl.softcredit;

import org.eclipse.jetty.websocket.api.Session;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import static j2html.TagCreator.article;
import static j2html.TagCreator.b;
import static spark.Spark.init;
import static spark.Spark.staticFileLocation;
import static spark.Spark.webSocket;

public class Arena {

    static Map<Session, String> userUsernameMap = new HashMap<>();
    static int nextUserNumber = 1;

    public static void main(String[] args) {
        staticFileLocation("public");
        webSocket("/chat", ChatWebSocketHandler.class);
        webSocket("/arena", GameWebSocketHandler.class);
        init();
    }

    public static void broadcastPosition(String sender, String position) {
        userUsernameMap.keySet().stream().filter(Session::isOpen).forEach(session -> {
            try {
                session.getRemote().sendString(String.valueOf(
                        new JSONObject().put("user",sender).put("position", position)));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public static void broadcastMessage(String sender, String message) {
        userUsernameMap.keySet().stream().filter(Session::isOpen).forEach(session -> {
            try {
                session.getRemote().sendString(String.valueOf(
                        new JSONObject().put("userMessage",
                                             createHtmlMessageFromSender(
                                                     sender,
                                                     message))
                                .put("userlist",
                                     userUsernameMap
                                             .values())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    private static String createHtmlMessageFromSender(String sender, String message) {
        return article().with(b(sender + ": ").withText(message)).render();
    }

}
