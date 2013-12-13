package controllers;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import models.Note;
import models.Tag;
import models.User;
import models.Video;
import play.mvc.Controller;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by D Mak on 12.12.13.
 */
public class NoteController extends Controller{

    public static void saveNote(){
        String title = request.params.get("note-title");
        String content = request.params.get("note-content");
        int startTime = Integer.parseInt(request.params.get("note-start-int"));
        Video video = Video.findById(Long.parseLong(request.params.get("video-id")));
        /*change to actual user*/
        User user = new User("email", "pass", "user");
        user.save();

        Note note = new Note(title, content, startTime, video, user, null);

        String tagsString = request.params.get("tags");
        String[] tagsStringList = tagsString.split(", ");
        ArrayList<Tag> tags = new ArrayList<Tag>();

        for(String tag : tagsStringList){
            //TODO: search for existing tag, before creating a new one
            Tag tagObj = new Tag(tag, note, video);
            tagObj.save();
            tags.add(tagObj);
        }

        //note.tags = tags;
        note.save();

        //TODO: adding to the already existing tags, instead of overwriting them
        //video.tags = tags;
        //video.save();

        System.out.println(tags);

        redirect("/video/" + video.id);
    }

    public static void getNotes(String id){
        Gson gson = new Gson();
        Video video = Video.findById(Long.parseLong(id));

        List<Note> notes = Note.findAllByVideoId(video);
        JsonElement json = gson.toJsonTree(notes);
        renderJSON(json);
    }
}
