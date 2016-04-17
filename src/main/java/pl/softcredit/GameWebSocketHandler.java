package pl.softcredit;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

@WebSocket
public class GameWebSocketHandler {

    private String sender, msg;

    @OnWebSocketConnect
    public void onConnect(Session user) throws Exception {
        String username = "User" + Arena.nextUserNumber++;
        Arena.userUsernameMap.put(user, username);
        Arena.broadcastMessage(sender = "Server", msg = (username + " joined the game"));
    }

    @OnWebSocketClose
    public void onClose(Session user, int statusCode, String reason) {
        String username = Arena.userUsernameMap.get(user);
        Arena.userUsernameMap.remove(user);
        Arena.broadcastMessage(sender = "Server", msg = (username + " left the game"));
    }

    @OnWebSocketMessage
    public void onMessage(Session user, String message) {
        Arena.broadcastMessage(sender = Arena.userUsernameMap.get(user), msg = message);
    }

}
