
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  message_text: string;
  sender_id: string;
  created_at: string;
}

interface Conversation {
  id: string;
  listing_id: number;
  buyer_id: string;
  seller_id: string;
}

const ContactSeller = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample listing data (in real app, this would be fetched)
  const sampleListings = [
    {
      id: 1,
      title: "Complete First Year Group 1 Set",
      books: ["BITS F110", "BIO F110", "BIO F111", "MATH F111", "BITS F112", "BITS F111", "CS F111"],
      price: 5500,
      quality: "Good",
      seller: "Arjun K.",
      sellerId: "seller-1", // This would be the actual user ID
      rating: 4.8,
      photos: 3,
      type: "full-set",
      group: "Group 1",
      missingBooks: [],
      averagePrice: 6000
    },
    {
      id: 2,
      title: "Partial Group 2 Set (4 Books)",
      books: ["PHY F111", "CHEM F111", "MATH F112", "EEE F111"],
      price: 3200,
      quality: "Like New",
      seller: "Priya S.",
      sellerId: "seller-2",
      rating: 4.9,
      photos: 2,
      type: "partial-set",
      group: "Group 2",
      missingBooks: ["ME F110", "MATH F113", "CHEM F110", "PHY F110"],
      averagePrice: 3500
    },
    {
      id: 3,
      title: "MATH F111 Textbook",
      books: ["MATH F111"],
      price: 800,
      quality: "Acceptable",
      seller: "Rahul M.",
      sellerId: "seller-3",
      rating: 4.6,
      photos: 1,
      type: "individual",
      group: "Group 1",
      missingBooks: [],
      averagePrice: 900
    }
  ];

  const listing = sampleListings.find(l => l.id === parseInt(listingId || "0"));

  const suggestionMessages = [
    "Is this book still available?",
    "Can I see more photos of the book?",
    "What's the condition of the book?",
    "Where can we meet for pickup?",
    "Is the price negotiable?"
  ];

  useEffect(() => {
    if (!user || !listing) return;
    
    loadConversation();
  }, [user, listing]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadConversation = async () => {
    if (!user || !listing) return;

    try {
      // Check if conversation exists
      const { data: existingConversation, error: conversationError } = await supabase
        .from('conversations')
        .select('*')
        .eq('listing_id', listing.id)
        .eq('buyer_id', user.id)
        .single();

      if (conversationError && conversationError.code !== 'PGRST116') {
        console.error('Error loading conversation:', conversationError);
        return;
      }

      if (existingConversation) {
        setConversation(existingConversation);
        loadMessages(existingConversation.id);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createConversation = async () => {
    if (!user || !listing) return null;

    try {
      // For demo purposes, we'll use a mock seller ID
      const sellerId = "90d18e02-0a4a-448d-af66-db019feecc68"; // This should be the actual seller's ID
      
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          listing_id: listing.id,
          buyer_id: user.id,
          seller_id: sellerId
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        return null;
      }

      setConversation(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!user || !messageText.trim()) return;

    setSending(true);
    
    try {
      let currentConversation = conversation;
      
      if (!currentConversation) {
        currentConversation = await createConversation();
        if (!currentConversation) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create conversation"
          });
          return;
        }
      }

      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: currentConversation.id,
          sender_id: user.id,
          message_text: messageText
        })
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send message"
        });
        return;
      }

      setMessages(prev => [...prev, data]);
      setNewMessage("");
      
      toast({
        title: "Message sent!",
        description: "Your message has been sent to the seller."
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message"
      });
    } finally {
      setSending(false);
    }
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Listing not found</h2>
          <p className="text-gray-500 mb-4">The listing you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-lg truncate">{listing.title}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">₹{listing.price.toLocaleString()}</span>
              <Badge variant="secondary">{listing.quality}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-h-[calc(100vh-160px)]">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-blue-50 rounded-lg p-6 mx-auto max-w-md">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-2">Start the conversation</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Send a message to {listing.seller} about this listing
                  </p>
                  <div className="space-y-2">
                    {suggestionMessages.slice(0, 3).map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_id === user.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.message_text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender_id === user.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.created_at).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
              disabled={sending}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {suggestionMessages.slice(3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSeller;
