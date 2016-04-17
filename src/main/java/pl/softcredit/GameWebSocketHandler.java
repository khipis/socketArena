package pl.softcredit;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

@WebSocket
public class GameWebSocketHandler {

    private String sender, msg;

    @OnWebSocketMessage
    public void onMessage(Session user, String position) {
        Arena.broadcastPosition(sender = Arena.userUsernameMap.get(user), msg = position);
    }

}
